// import {Badge, Button, Card, Group, Image, Text} from "@mantine/core";
import {Await, createFileRoute} from "@tanstack/react-router";
import {z} from "zod/v4-mini";
import {baseUrl} from "../lib/constants";
import {TaskSchema} from "../schemas/task";

function sleep(ms = 3000) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
async function fetchTaskById(taskId: number) {
	await sleep(5000); // Simulate network delay
	let response = await fetch(`${baseUrl}/task/${taskId}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch task with ID ${taskId}`);
	}
	let data = await response.json();
	return TaskSchema.parse(data);
}

export const Route = createFileRoute("/tasks/$taskId")({
	params: {
		parse: (params) => ({
			taskId: z.number().parse(Number(params.taskId)),
		}),
		stringify: (params) => ({taskId: `${params.taskId}`}),
	},
	loader: async ({params}) => ({
		task: fetchTaskById(params.taskId),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	// let {taskId} = Route.useParams();
	let {task} = Route.useLoaderData();
	return (
		<div className="mx-auto max-w-2xl">
			<Await promise={task} fallback={<div>Loading...</div>}>
				{(data) => {
					return <div>{JSON.stringify(data, null, 2)}</div>;
				}}
			</Await>

			{/* <Card shadow="sm" padding="lg" radius="md" withBorder>
				<Card.Section>
					<Image
						src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
						height={160}
						alt="Norway"
					/>
				</Card.Section>

				<Group justify="space-between" mt="md" mb="xs">
					<Text fw={500}>{task.title}</Text>
					<Badge color="pink">{task.priority}</Badge>
				</Group>

				<Text size="sm" c="dimmed">
					{task.description}
				</Text>

				<Button
					color={task.completed ? "green" : "gray"}
					fullWidth
					mt="md"
					radius="md"
					onClick={() => {
						if (taskId !== task.id) {
							console.log("Task ID mismatch:", taskId, task.id);
						} else {
							console.log("Sending the task id to complete:", task.id);
						}
					}}
				>
					{task.completed ? "Completed" : "Complete task"}
				</Button>
			</Card> */}
		</div>
	);
}
