import {z} from "zod/v4-mini";
import {baseUrl} from "../lib/constants";
import {type Task, TaskSchema} from "../schemas/task";

export async function getAllTasks() {
	try {
		const response = await fetch(baseUrl);
		const data = await response.json();
		const result = z.array(TaskSchema).safeParse(data);
		if (result.success) {
			return result.data;
		}
		// biome-ignore lint/suspicious/noConsole: Suppressing this warning as we want to log invalid data format
		console.warn("Invalid data format:", result.error);
		return [];
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error("Error fetching all tasks:", error);
		throw new Error(
			`Failed to fetch tasks: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export async function toggleTaskCompleted(taskId: string) {
	const response = await fetch(`${baseUrl}/toggle-completed`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({id: taskId}),
	});
	return response.json();
}

export async function createTask(task: Omit<z.infer<typeof TaskSchema>, "id">) {
	const response = await fetch(baseUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task),
	});
	return response.json();
}

export async function updateTask(formData: Task, taskId: number) {
	let response = await fetch(`${baseUrl}/update/${taskId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	if (!response.ok) {
		throw new Error(`Failed to update task with ID ${taskId}`);
	}
	let result = await response.json();
	return TaskSchema.parse(result.data);
}

let DeleteTaskMutationSchema = z.object({
	ok: z.boolean(),
});
export async function deleteTask(taskId: number) {
	async () => {
		const res = await fetch(`${baseUrl}/${taskId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!res.ok) {
			throw new Error(`Failed to delete task with ID ${taskId}`);
		}
		let data = await res.json();
		return DeleteTaskMutationSchema.parse(data);
	};
}

export async function fetchTaskById(taskId: number) {
	let response = await fetch(`${baseUrl}/task/${taskId}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch task with ID ${taskId}`);
	}
	let data = await response.json();
	return TaskSchema.parse(data);
}
