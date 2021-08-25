import { Duplex } from 'stream';
import { MetaMaskInpageProvider } from '@metamask/inpage-provider';
import ObjectMultiplex from '@metamask/object-multiplex';
import pump from 'pump';
import { WindowPostMessageStream } from '@metamask/post-message-stream';
import type { JsonRpcId, JsonRpcRequest } from 'json-rpc-engine';
import { PluginProvider } from '@mm-snap/types';
import 'isomorphic-fetch'; //eslint-disable-line
import 'ses'; //eslint-disable-line
import EEOpenRPCDocument from '../openrpc.json';
import { STREAM_NAMES } from './enums';

import { IframeExecutionEnvironmentMethodMapping, methods } from './methods';
import { JSONRPCRequest } from './__GENERATED_TYPES__';
import { sortParamKeys } from './helpers/sortParams';

type PluginRpcHandler = (
  origin: string,
  request: JSONRPCRequest,
) => Promise<unknown>;

lockdown({
  // TODO: Which would we use in prod?
  mathTaming: 'unsafe',
  errorTaming: 'unsafe',
  dateTaming: 'unsafe',
});

// init
class Controller {
  public pluginRpcHandlers: Map<string, PluginRpcHandler>;

  private initialized = false;

  private commandStream?: Duplex;

  private rpcStream?: Duplex;

  private methods?: IframeExecutionEnvironmentMethodMapping;

  constructor() {
    this.pluginRpcHandlers = new Map();
  }

  initialize() {
    if (this.initialized) {
      return;
    }
    this.connectToParent();
  }

  private async connectToParent() {
    console.log('Worker: Connecting to parent.');

    const parentStream = new WindowPostMessageStream({
      name: 'child',
      target: 'parent',
      targetWindow: window.parent,
    });
    const mux = setupMultiplex(parentStream as any, 'Parent');

    this.commandStream = (mux.createStream(
      STREAM_NAMES.COMMAND,
    ) as unknown) as Duplex;
    this.commandStream?.on('data', this.onCommandRequest.bind(this));

    this.rpcStream = (mux.createStream(
      STREAM_NAMES.JSON_RPC,
    ) as unknown) as Duplex;

    this.methods = methods(this);
  }

  private async onCommandRequest(message: JsonRpcRequest<unknown>) {
    if (!message || typeof message !== 'object' || Array.isArray(message)) {
      console.error('Command stream received non-object message.');
      return;
    }

    const { id, method, params } = message;

    if (
      id === null ||
      id === undefined ||
      (typeof id !== 'string' && typeof id !== 'number')
    ) {
      console.error(`Command stream received invalid id "${id}".`, message);
      return;
    }
    if (!method) {
      return;
    }
    if (method === 'rpc.discover') {
      this.respond(id, {
        result: EEOpenRPCDocument,
      });
      return;
    }
    if (this.methods) {
      const methodObject = EEOpenRPCDocument.methods.find(
        (m) => m.name === method,
      );

      // support params by-name and by-position
      const paramsAsArray =
        params instanceof Array ? params : sortParamKeys(methodObject, params);

      if (!(this.methods as any)[method]) {
        this.respond(id, {
          error: {
            code: -32601,
            message: 'Method Not Found',
            data: method,
          },
        });
        return;
      }
      try {
        const result = await (this.methods as any)[method](...paramsAsArray);
        this.respond(id, { result });
      } catch (e) {
        this.respond(id, {
          error: {
            code: -32603,
            message: `Internal JSON-RPC error: ${e.message}`,
          },
        });
      }
    } else {
      this.respond(id, {
        error: new Error(`Unrecognized command: ${method}.`),
      });
    }
  }

  public respond(id: JsonRpcId, responseObj: Record<string, unknown>) {
    this.commandStream?.write({
      ...responseObj,
      id,
      jsonrpc: '2.0',
    });
  }

  /**
   * Attempts to evaluate a plugin in SES.
   * Generates the APIs for the plugin. May throw on error.
   *
   * @param {string} pluginName - The name of the plugin.
   * @param {Array<string>} approvedPermissions - The plugin's approved permissions.
   * Should always be a value returned from the permissions controller.
   * @param {string} sourceCode - The source code of the plugin, in IIFE format.
   * @param {Object} ethereumProvider - The plugin's Ethereum provider object.
   */
  public startPlugin(pluginName: string, sourceCode: string) {
    console.log(`starting plugin '${pluginName}' in worker`);

    const wallet = this.createPluginProvider(pluginName);

    const endowments = {
      BigInt,
      Buffer,
      console, // Adding raw console for now
      crypto: window.crypto,
      Date,
      fetch: window.fetch.bind(window),
      Math, // Math.random is considered unsafe, but we need it
      setTimeout,
      SubtleCrypto: window.SubtleCrypto,
      wallet,
      WebSocket,
      XMLHttpRequest,
    };

    try {
      const compartment = new Compartment({
        ...endowments,
        window: { ...endowments },
      });
      compartment.evaluate(sourceCode);
    } catch (err) {
      this.removePlugin(pluginName);
      throw new Error(`Error while running plugin '${pluginName}'.`);
    }
  }

  /**
   * Sets up the given plugin's RPC message handler, creates a hardened
   * plugin provider object (i.e. globalThis.wallet), and returns it.
   */
  private createPluginProvider(pluginName: string): PluginProvider {
    const pluginProvider = (new MetaMaskInpageProvider(this.rpcStream as any, {
      shouldSendMetadata: false,
    }) as unknown) as Partial<PluginProvider>;

    pluginProvider.registerRpcMessageHandler = (func: PluginRpcHandler) => {
      console.log('Worker: Registering RPC message handler', func);
      if (this.pluginRpcHandlers.has(pluginName)) {
        throw new Error('RPC handler already registered.');
      }
      this.pluginRpcHandlers.set(pluginName, func);
    };

    // TODO: harden throws an error. Why?
    // return harden(pluginProvider as PluginProvider);
    return pluginProvider as PluginProvider;
  }

  /**
   * Removes the plugin with the given name. Specifically:
   * - Deletes the plugin's RPC handler, if any
   */
  private removePlugin(pluginName: string): void {
    this.pluginRpcHandlers.delete(pluginName);
  }
}

function setupMultiplex(connectionStream: Duplex, streamName: string) {
  const mux = new ObjectMultiplex();
  pump(connectionStream, mux as any, connectionStream, (err) => {
    if (err) {
      console.error(`${streamName} stream failure, closing worker.`, err);
    }
    self.close();
  });
  return mux;
}

export default Controller;
