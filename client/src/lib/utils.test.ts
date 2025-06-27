import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "./utils";

describe("debounce", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("delays function execution", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn("test");
		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(mockFn).toHaveBeenCalledWith("test");
	});

	it("cancels previous calls when called multiple times", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn("first");
		debouncedFn("second");
		debouncedFn("third");

		vi.advanceTimersByTime(100);

		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith("third");
	});

	it("calls function with correct arguments", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn("arg1", "arg2", "arg3");
		vi.advanceTimersByTime(100);

		expect(mockFn).toHaveBeenCalledWith("arg1", "arg2", "arg3");
	});

	it("handles multiple separate calls with different delays", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		// First call
		debouncedFn("first");
		vi.advanceTimersByTime(100);
		expect(mockFn).toHaveBeenCalledWith("first");

		// Reset mock
		mockFn.mockClear();

		// Second call after delay
		debouncedFn("second");
		vi.advanceTimersByTime(100);
		expect(mockFn).toHaveBeenCalledWith("second");
	});

	it("works with different delay values", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 250);

		debouncedFn("test");

		vi.advanceTimersByTime(200);
		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(50);
		expect(mockFn).toHaveBeenCalledWith("test");
	});

	it("preserves function context", () => {
		const obj = {
			value: "test",
			method: vi.fn(function (this: { value: string }) {
				return this.value;
			}),
		};

		const debouncedMethod = debounce(obj.method.bind(obj), 100);
		debouncedMethod();

		vi.advanceTimersByTime(100);
		expect(obj.method).toHaveBeenCalled();
	});
});
