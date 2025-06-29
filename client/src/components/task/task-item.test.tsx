import {List} from "@mantine/core";
import {screen} from "@testing-library/react";
import type React from "react";
import {describe, expect, it, vi} from "vitest";
import type {Task} from "@/schemas/task";
import {renderWithProviders} from "@/test/utils";
import {TaskItem} from "./task-item";

// Mock the A component to avoid router dependency
vi.mock("@/components/a", () => ({
	A: ({children, ...props}: {children: React.ReactNode; [key: string]: unknown}) => (
		<div {...props}>{children}</div>
	),
}));

describe("TaskItem", () => {
	it("should display task title", () => {
		renderWithProviders(
			<List>
				<TaskItem task={createMockTask()} />
			</List>,
		);
		expect(screen.getByText("Test Task")).toBeInTheDocument();
	});

	it("should display task description", () => {
		renderWithProviders(
			<List>
				<TaskItem task={createMockTask()} />
			</List>,
		);
		expect(screen.getByText("This is a test task")).toBeInTheDocument();
	});

	it("should display task priority badge", () => {
		renderWithProviders(
			<List>
				<TaskItem task={createMockTask({priority: "HIGH"})} />
			</List>,
		);
		expect(screen.getByText("HIGH")).toBeInTheDocument();
	});
});

function createMockTask(overrides = {}): Task {
	return {
		id: 1,
		title: "Test Task",
		description: "This is a test task",
		priority: "MEDIUM",
		completed: false,
		...overrides,
	};
}
