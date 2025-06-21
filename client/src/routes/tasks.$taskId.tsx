import {createFileRoute} from "@tanstack/react-router";
import {z} from "zod/v4-mini";

const baseUrl = "http://0.0.0.0:8080/tasks/api/v1";
async function fetchTaskById(taskId: number) {
	let response = await fetch(`${baseUrl}/task/${taskId}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch task with ID ${taskId}`);
	}
	let data = await response.json();
	return z
		.object({
			id: z.number(),
			title: z.string(),
			description: z.string(),
			priority: z.enum(["LOW", "MEDIUM", "HIGH", "VITAL"]),
			completed: z.boolean(),
		})
		.parse(data);
}

export const Route = createFileRoute("/tasks/$taskId")({
	params: {
		parse: (params) => ({
			taskId: z.number().parse(Number(params.taskId)),
		}),
		stringify: (params) => ({taskId: `${params.taskId}`}),
	},
	loader: async ({params}) => fetchTaskById(params.taskId),
	component: RouteComponent,
});

function RouteComponent() {
	let {taskId} = Route.useParams();
	let task = Route.useLoaderData();
	console.log("task", task);
	return (
		<div>
			<h1>Task Details for ID: {taskId}</h1>
			<p>
				<strong>Title:</strong> {task.title}
			</p>
			<p>
				<strong>Description:</strong> {task.description}
			</p>
			<p>
				<strong>Priority:</strong> {task.priority}
			</p>
			<p>
				<strong>Completed:</strong> {task.completed ? "Yes" : "No"}
			</p>
		</div>
	);
}
