/**
 * Creates a debounced version of the provided function that delays its execution until after
 * a specified delay has elapsed since the last time it was invoked.
 *
 * @typeParam T - The type of the function to debounce.
 * @param fn - The function to debounce.
 * @param delay - The number of milliseconds to delay.
 * @returns A debounced version of the input function.
 *
 * @example
 * ```typescript
 * const debouncedLog = debounce(console.log, 300);
 * debouncedLog('Hello');
 * debouncedLog('World');
 * // Only 'World' will be logged after 300ms
 * ```
 */
// biome-ignore lint/suspicious/noExplicitAny: Suppressing this warning as the function is generic and can accept any type of arguments.
export function debounce<T extends (...args: any[]) => void>(
	fn: T,
	delay: number,
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
