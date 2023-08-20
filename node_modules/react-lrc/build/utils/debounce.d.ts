declare function debounce<F extends (...params: unknown[]) => unknown>(f: F, wait?: number): (...params: Parameters<F>) => void;
export default debounce;
