/**
 * Creates a pair of `setTimeout` and `clearTimeout` functions attenuated such
 * that:
 * - `setTimeout` throws if its "handler" parameter is not a function.
 * - `clearTimeout` only clears timeouts created by its sibling `setTimeout`,
 *   or else no-ops.
 *
 * @returns An object with the attenuated `setTimeout` and `clearTimeout`
 * functions.
 */
export const createTimeout = () => {
  const registeredTimeouts = new Set<number>();

  const _setTimeout = (handler: TimerHandler, timeout?: number): number => {
    if (typeof handler !== 'function') {
      throw new Error(
        `The timeout handler must be a function. Received: ${typeof handler}`,
      );
    }

    const handle = setTimeout(handler, timeout);
    registeredTimeouts.add(handle);
    return handle;
  };

  const _clearTimeout = (handle: number): void => {
    if (registeredTimeouts.has(handle)) {
      clearTimeout(handle);
    }
  };

  return { setTimeout: _setTimeout, clearTimeout: _clearTimeout } as const;
};
