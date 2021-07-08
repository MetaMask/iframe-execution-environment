import Controller from './controller';
import { ExecutePlugin, Handshake, PluginRpc } from './__GENERATED_TYPES__';

export interface IframeExecutionEnvironmentMethodMapping {
  handshake: Handshake;
  executePlugin: ExecutePlugin;
  pluginRpc: PluginRpc;
}

export const methods = (
  context: Controller,
): IframeExecutionEnvironmentMethodMapping => {
  return {
    handshake: async () => {
      return 'OK';
    },
    executePlugin: async (pluginName, sourceCode) => {
      context.startPlugin(pluginName as string, sourceCode as string);
      return 'OK';
    },
    pluginRpc: async (target, requestOrigin, request) => {
      const handler = context.pluginRpcHandlers.get(target);

      if (!handler) {
        throw new Error(`No RPC handler registered for plugin "${target}".`);
      }
      return handler(requestOrigin, request) as any;
    },
  };
};
