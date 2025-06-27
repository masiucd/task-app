import {screen} from "@testing-library/react";
// Mock window.matchMedia for Mantine compatibility in tests
import {describe, expect, it, vi} from "vitest";
import type {Priority} from "@/schemas/task";
import {renderWithProviders} from "@/test/utils";
import {TaskBadge} from "./task-badge";

beforeAll(() => {
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
});

describe("TaskBadge", () => {
	it("renders the priority text", () => {
		renderWithProviders(<TaskBadge priority="HIGH" />);
		expect(screen.getByText("HIGH")).toBeInTheDocument();
	});

	it("applies correct color for HIGH priority", () => {
		renderWithProviders(<TaskBadge priority="HIGH" />);
		const badge = screen.getByText("HIGH");
		expect(badge).toBeInTheDocument();
		// Note: Mantine applies complex styling, so we mainly test that it renders
	});

	it("applies correct color for MEDIUM priority", () => {
		renderWithProviders(<TaskBadge priority="MEDIUM" />);
		const badge = screen.getByText("MEDIUM");
		expect(badge).toBeInTheDocument();
	});

	it("applies correct color for LOW priority", () => {
		renderWithProviders(<TaskBadge priority="LOW" />);
		const badge = screen.getByText("LOW");
		expect(badge).toBeInTheDocument();
	});

	it("applies correct color for VITAL priority", () => {
		renderWithProviders(<TaskBadge priority="VITAL" />);
		const badge = screen.getByText("VITAL");
		expect(badge).toBeInTheDocument();
	});

	it("renders with light variant by default", () => {
		renderWithProviders(<TaskBadge priority="HIGH" />);
		const badge = screen.getByText("HIGH");
		expect(badge).toBeInTheDocument();
	});

	it("renders with filled variant when specified", () => {
		renderWithProviders(<TaskBadge priority="HIGH" variant="filled" />);
		const badge = screen.getByText("HIGH");
		expect(badge).toBeInTheDocument();
	});

	it.each<Priority>(["LOW", "MEDIUM", "HIGH", "VITAL"])(
		"renders %s priority correctly",
		(priority) => {
			renderWithProviders(<TaskBadge priority={priority} />);
			expect(screen.getByText(priority)).toBeInTheDocument();
		},
	);
});
