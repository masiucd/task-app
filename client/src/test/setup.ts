import "@testing-library/jest-dom";
import {vi} from "vitest";

// Mock window.matchMedia for Mantine compatibility in tests
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
	}),
});
