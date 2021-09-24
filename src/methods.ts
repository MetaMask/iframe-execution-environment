import Controller from './controller';
import { ExecutePlugin, Ping, PluginRpc } from './__GENERATED_TYPES__';

export interface IframeExecutionEnvironmentMethodMapping {
  ping: Ping;
  executePlugin: ExecutePlugin;
  pluginRpc: PluginRpc;
}

export const methods = (
  context: Controller,
): IframeExecutionEnvironmentMethodMapping => {
  return {
    ping: async () => {
      return 'OK';
    },
    executePlugin: async (pluginName, sourceCode) => {
      if (pluginName === undefined) {
        throw new Error('pluginName is not defined');
      }
      if (typeof pluginName !== 'string') {
        throw new Error('pluginName is not a string');
      }
      if (sourceCode === undefined) {
        throw new Error('sourceCode is not defined');
      }
      if (typeof sourceCode !== 'string') {
        throw new Error('sourceCode is not a string');
      }
      context.startPlugin(pluginName as string, sourceCode as string);
      return 'OK';
    },
    pluginRpc: async (target, requestOrigin, request) => {
      const handler = context.pluginRpcHandlers.get(target);

      if (!handler) {
        throw new Error(`No RPC handler registered for plugin "${target}".`);
      }
      return handler(requestOrigin, request) as Promise<any>;
    },
  };
};
