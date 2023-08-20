declare function throttle<F extends (...params: unknown[]) => unknown>(f: F, wait?: number): (...params: Parameters<F>) => ReturnType<F> | void;
export default throttle;
