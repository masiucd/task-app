import {describe, expect, it} from "vitest";
import {type Priority, type Task, TaskSchema} from "./task";

describe("TaskSchema", () => {
	it("validates a correct task object", () => {
		const validTask = {
			id: 1,
			title: "Test Task",
			description: "This is a test task",
			priority: "HIGH" as Priority,
			completed: false,
		};

		const result = TaskSchema.safeParse(validTask);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toEqual(validTask);
		}
	});

	it("rejects task with missing required fields", () => {
		const invalidTask = {
			title: "Test Task",
			// missing id, description, priority, completed
		};

		const result = TaskSchema.safeParse(invalidTask);
		expect(result.success).toBe(false);
	});

	it("rejects task with invalid priority", () => {
		const invalidTask = {
			id: 1,
			title: "Test Task",
			description: "This is a test task",
			priority: "INVALID_PRIORITY",
			completed: false,
		};

		const result = TaskSchema.safeParse(invalidTask);
		expect(result.success).toBe(false);
	});

	it("accepts all valid priority values", () => {
		const priorities: Priority[] = ["LOW", "MEDIUM", "HIGH", "VITAL"];

		priorities.forEach((priority) => {
			const task = {
				id: 1,
				title: "Test Task",
				description: "This is a test task",
				priority,
				completed: false,
			};

			const result = TaskSchema.safeParse(task);
			expect(result.success).toBe(true);
		});
	});

	it("rejects task with invalid types", () => {
		const invalidTask = {
			id: "not-a-number",
			title: 123,
			description: true,
			priority: "HIGH",
			completed: "not-a-boolean",
		};

		const result = TaskSchema.safeParse(invalidTask);
		expect(result.success).toBe(false);
	});

	it("validates completed task", () => {
		const completedTask: Task = {
			id: 1,
			title: "Completed Task",
			description: "This task is done",
			priority: "LOW",
			completed: true,
		};

		const result = TaskSchema.safeParse(completedTask);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.completed).toBe(true);
		}
	});
});
