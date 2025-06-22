import {Badge, Container, Flex, List, Skeleton, Title} from "@mantine/core";
import {Await, createFileRoute} from "@tanstack/react-router";
import {z} from "zod/v4-mini";
import {baseUrl} from "../lib/constants";
import {sleep} from "../lib/utils";
import {type Priority, TaskSchema} from "../schemas/task";

async function fetchTodos() {
	try {
		let response = await fetch(baseUrl);
		let data = await response.json();
		return data;
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error("Error fetching todos:", error);
		throw error;
	}
}

async function allTodos() {
	try {
		await sleep(2000); // Simulate network delay
		let data = await fetchTodos();
		let result = z.array(TaskSchema).safeParse(data);
		if (result.success) {
			return result.data;
		}
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
						<List>
							{t.map((task) => (
								<List.Item key={task.id}>
									<strong>{task.title}</strong> -{" "}
									<Badge autoContrast color={colorByPriority(task.priority)}>
										{task.priority}
									</Badge>
								</List.Item>
							))}
						</List>
					)}
				</Await>
			</Container>
		</div>
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
