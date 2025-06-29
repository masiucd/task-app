import {z} from "zod/v4-mini";
import {baseUrl} from "../lib/constants";
import {type CreateTask, type Task, TaskSchema} from "../schemas/task";

export async function getAllTasks() {
	try {
		const response = await fetch(baseUrl);
		const data = await response.json();
		const result = z.array(TaskSchema).safeParse(data.data);
		if (result.success) {
			return result.data;
		}
		console.warn("Invalid data format:", result.error);
		return [];
	} catch (error) {
		console.error("Error fetching all tasks:", error);
		return [];
	}
}

export async function toggleTaskCompleted(taskId: number) {
	try {
		const response = await fetch(`${baseUrl}/toggle-completed`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({id: taskId}),
		});

		if (!response.ok) {
			throw new Error(`Failed to toggle task completion for ID ${taskId}`);
		}

		return response.json();
	} catch (error) {
		console.error("Error toggling task completion:", error);
		return null;
	}
}

export async function createTask(task: CreateTask) {
	try {
		const response = await fetch(baseUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(task),
		});

		if (!response.ok) {
			throw new Error("Failed to create task");
		}

		return response.json();
	} catch (error) {
		console.error("Error creating task:", error);
		return null;
	}
}

export async function updateTask(formData: Task, taskId: number) {
	try {
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
	} catch (error) {
		console.error("Error updating task:", error);
		return null;
	}
}

let DeleteTaskMutationSchema = z.object({
	ok: z.boolean(),
});
export async function deleteTask(taskId: number) {
	try {
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
	} catch (error) {
		console.error("Error deleting task:", error);
		return null;
	}
}

export async function fetchTaskById(taskId: number) {
	try {
		let response = await fetch(`${baseUrl}/task/${taskId}`);
		if (!response.ok) {
			throw new Error(`Failed to fetch task with ID ${taskId}`);
		}
		let data = await response.json();
		return TaskSchema.parse(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error fetching task with ID ${taskId}:`, error.message);
		} else {
			console.error(`Error fetching task with ID ${taskId}:`, error);
		}
		return null;
	}
}

// class ResponseWrapper<T> {
// 	constructor(public message:string,public data: T, public ok: boolean) {
// 		Object.freeze(this);
// 	}

// }
