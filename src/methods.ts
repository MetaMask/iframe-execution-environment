import Controller from './controller';
import { ExecuteSnap, Ping, SnapRpc } from './__GENERATED_TYPES__';

export interface IframeExecutionEnvironmentMethodMapping {
  ping: Ping;
  executeSnap: ExecuteSnap;
  snapRpc: SnapRpc;
}

export const methods = (
  context: Controller,
): IframeExecutionEnvironmentMethodMapping => {
  return {
    ping: async () => {
      return 'OK';
    },
    executeSnap: async (snapName, sourceCode, endowments) => {
      if (snapName === undefined) {
        throw new Error('snapName is not defined');
      }
      if (typeof snapName !== 'string') {
        throw new Error('snapName is not a string');
      }
      if (sourceCode === undefined) {
        throw new Error('sourceCode is not defined');
      }
      if (typeof sourceCode !== 'string') {
        throw new Error('sourceCode is not a string');
      }
      context.startSnap(snapName as string, sourceCode as string, endowments);
      return 'OK';
    },
    snapRpc: async (target, requestOrigin, request) => {
      const handler = context.snapRpcHandlers.get(target);

      if (!handler) {
        throw new Error(`No RPC handler registered for snap "${target}".`);
      }
      return handler(requestOrigin, request) as Promise<any>;
    },
  };
};
