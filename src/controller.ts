import { Duplex } from 'stream';
import { MetaMaskInpageProvider } from '@metamask/inpage-provider';
import ObjectMultiplex from '@metamask/object-multiplex';
import pump from 'pump';
import { WindowPostMessageStream } from '@metamask/post-message-stream';
import type { JsonRpcId, JsonRpcRequest } from 'json-rpc-engine';
import { PluginProvider as SnapProvider } from '@mm-snap/types';
import 'isomorphic-fetch'; //eslint-disable-line
import 'ses'; //eslint-disable-line
import { ethErrors, serializeError } from 'eth-rpc-errors';
import EEOpenRPCDocument from '../openrpc.json';
import { STREAM_NAMES } from './enums';

import { IframeExecutionEnvironmentMethodMapping, methods } from './methods';
import {
  Endowments,
  JSONRPCRequest,
  StringDoaGddGA,
} from './__GENERATED_TYPES__';
import { sortParamKeys } from './helpers/sortParams';

type SnapRpcHandler = (
  origin: string,
  request: JSONRPCRequest,
) => Promise<unknown>;

lockdown({
  // TODO: Which would we use in prod?
  mathTaming: 'unsafe',
  errorTaming: 'unsafe',
  dateTaming: 'unsafe',
});

const fallbackError = {
  code: -32603,
  message: 'Execution Environment Error',
};

// init
class Controller {
  public snapRpcHandlers: Map<string, SnapRpcHandler>;

  private initialized = false;

  private commandStream?: Duplex;

  private rpcStream?: Duplex;

  private methods?: IframeExecutionEnvironmentMethodMapping;

  private snapErrorHandler?: (event: ErrorEvent) => void;

  private snapPromiseErrorHandler?: (event: PromiseRejectionEvent) => void;

  constructor() {
    this.snapRpcHandlers = new Map();
  }

  public async initialize() {
    if (this.initialized) {
      throw new Error('already initialized');
    }
    return this.connectToParent();
  }

  private errorHandler(error: Error, data = {}) {
    const serializedError = serializeError(error, {
      fallbackError,
      shouldIncludeStack: true,
    });
    this.notify({
      id: null,
      error: {
        ...serializedError,
        data: {
          ...data,
          stack: serializedError.stack,
        },
      },
    });
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
          error: ethErrors.rpc
            .methodNotFound({
              data: {
                method,
              },
            })
            .serialize(),
        });
        return;
      }
      try {
        const result = await (this.methods as any)[method](...paramsAsArray);
        this.respond(id, { result });
      } catch (e) {
        this.respond(id, {
          error: serializeError(e, {
            fallbackError,
          }),
        });
      }
    } else {
      this.respond(id, {
        error: serializeError(new Error(`Unrecognized method: '${method}'.`)),
      });
    }
  }

  public notify(requestObject: Record<string, unknown>) {
    this.commandStream?.write({
      ...requestObject,
      jsonrpc: '2.0',
    });
  }

  public respond(id: JsonRpcId, responseObj: Record<string, unknown>) {
    this.commandStream?.write({
      ...responseObj,
      id,
      jsonrpc: '2.0',
    });
  }

  /**
   * Attempts to evaluate a snap in SES.
   * Generates the APIs for the snap. May throw on error.
   *
   * @param {string} snapName - The name of the snap.
   * @param {Array<string>} approvedPermissions - The snap's approved permissions.
   * Should always be a value returned from the permissions controller.
   * @param {string} sourceCode - The source code of the snap, in IIFE format.
   * @param {Array} endowments - An array of the names of the endowments.
   */
  public startSnap(
    snapName: string,
    sourceCode: string,
    _endowments: Endowments,
  ) {
    console.log(`starting snap '${snapName}' in worker`);
    if (this.snapPromiseErrorHandler) {
      window.removeEventListener(
        'unhandledrejection',
        this.snapPromiseErrorHandler,
      );
    }
    if (this.snapErrorHandler) {
      window.removeEventListener('error', this.snapErrorHandler);
    }

    const wallet = this.createSnapProvider(snapName);

    const endowments: Record<string, any> = {
      BigInt,
      Buffer,
      console, // Adding raw console for now
      crypto: window.crypto,
      Date,
      // fetch: window.fetch.bind(window),
      Math, // Math.random is considered unsafe, but we need it
      setTimeout,
      SubtleCrypto: window.SubtleCrypto,
      wallet,
      WebSocket,
      XMLHttpRequest,
    };

    if (_endowments && _endowments.length > 0) {
      _endowments.forEach((_endowment) => {
        endowments[_endowment] = (window as any)[_endowment].bind(window);
      });
    }

    this.snapErrorHandler = (error: ErrorEvent) => {
      this.errorHandler(error.error, { snapName });
    };
    this.snapPromiseErrorHandler = (error: PromiseRejectionEvent) => {
      this.errorHandler(error.reason, { snapName });
    };

    try {
      const compartment = new Compartment({
        ...endowments,
        window: { ...endowments },
      });
      compartment.evaluate(sourceCode);

      window.addEventListener(
        'unhandledrejection',
        this.snapPromiseErrorHandler,
      );
      window.addEventListener('error', this.snapErrorHandler);
    } catch (err) {
      this.removeSnap(snapName);
      throw new Error(
        `Error while running snap '${snapName}': ${(err as Error).message}`,
      );
    }
  }

  /**
   * Sets up the given snap's RPC message handler, creates a hardened
   * snap provider object (i.e. globalThis.wallet), and returns it.
   */
  private createSnapProvider(snapName: string): SnapProvider {
    const snapProvider = (new MetaMaskInpageProvider(this.rpcStream as any, {
      shouldSendMetadata: false,
    }) as unknown) as Partial<SnapProvider>;

    snapProvider.registerRpcMessageHandler = (func: SnapRpcHandler) => {
      console.log('Worker: Registering RPC message handler', func);
      if (this.snapRpcHandlers.has(snapName)) {
        throw new Error('RPC handler already registered.');
      }
      this.snapRpcHandlers.set(snapName, func);
    };

    // TODO: harden throws an error. Why?
    // return harden(snapProvider as SnapProvider);
    return snapProvider as SnapProvider;
  }

  /**
   * Removes the snap with the given name. Specifically:
   * - Deletes the snap's RPC handler, if any
   */
  private removeSnap(snapName: string): void {
    this.snapRpcHandlers.delete(snapName);
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
