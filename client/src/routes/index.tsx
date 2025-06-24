import {Badge, Checkbox, Container, Flex, List, Skeleton, Text, Title} from "@mantine/core";
import {useMutation} from "@tanstack/react-query";
import {Await, createFileRoute} from "@tanstack/react-router";
import {useState} from "react";
import {z} from "zod/v4-mini";
import {A} from "../components/a";
import {baseUrl} from "../lib/constants";
import {type Priority, TaskSchema} from "../schemas/task";

async function allTodos() {
	try {
		let response = await fetch(baseUrl);
		let data = await response.json();
		let result = z.array(TaskSchema).safeParse(data);
		if (result.success) {
			return result.data;
		}
		// biome-ignore lint/suspicious/noConsole: Suppressing this warning as we want to log invalid data format
		console.warn("Invalid data format:", result.error);
		return [];
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error("Error fetching all todos:", error);
		throw new Error(
			`Failed to fetch todos: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export const Route = createFileRoute("/")({
	component: Index,
	loader: async () => ({
		todos: allTodos(),
	}),
});

function Index() {
	let data = Route.useLoaderData();

	return (
		<div>
			<Title order={1}>All tasks</Title>
			<Container size="md" className="border-2">
				<Await promise={data.todos} fallback={<TasksLoader />}>
					{(t) => (
						<List className="flex flex-col gap-4">
							{t.map((task) => (
								<TaskItem key={task.id} task={task} />
							))}
						</List>
					)}
				</Await>
			</Container>
		</div>
	);
}

function TaskItem(props: {task: z.infer<typeof TaskSchema>}) {
	let [completed, setCompleted] = useState(props.task.completed);
	let mutation = useMutation({
		mutationFn: () => {
			return fetch(`${baseUrl}/toggle-completed`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({id: props.task.id}),
			}).then((res) => res.json());
		},
	});
	// TODO useOptimisticState to optimistically update the task completion status in the UI
	return (
		<List.Item key={props.task.id}>
			<Flex align="center" gap={10}>
				<Checkbox
					checked={completed}
					onChange={(e) => {
						// TODO update the task completion status in the backend
						// TODO optimistically update the task completion status in the UI so it feels snappier, we do not want to make too many requests to the backend
						setCompleted(e.currentTarget.checked);
						mutation.mutate();
						// debounce(() => {
						// }, 500);
					}}
				/>

				<A to="/tasks/$taskId" params={{taskId: props.task.id}}>
					<Title order={3}>{props.task.title}</Title>
				</A>
				<Badge autoContrast color={colorByPriority(props.task.priority)} variant="light">
					{props.task.priority}
				</Badge>
			</Flex>
			<Text>{props.task.description}</Text>
			<Text>{completed ? "Completed" : "In progress"}</Text>
		</List.Item>
	);
}

function TasksLoader() {
	return Array.from({length: 10}).map((_, i) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
		<Flex key={i} direction="column" gap={10}>
			<Skeleton height={12} radius="xl" mb={1} />
			<Skeleton height={8} mt={6} radius="xl" mb={1} />
			<Skeleton height={8} mt={6} width="70%" radius="xl" mb={1} />
		</Flex>
	));
}

function colorByPriority(priority: Priority) {
	switch (priority) {
		case "HIGH":
			return "red";
		case "MEDIUM":
			return "yellow";
		case "LOW":
			return "green";
		case "VITAL":
			return "gray";
		default:
			return "gray";
	}
}
