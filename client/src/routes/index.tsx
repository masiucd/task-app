import {Badge, List, Text, ThemeIcon, Title} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {Link, createFileRoute} from "@tanstack/react-router";
import {z} from "zod/v4-mini";

let TodoSchema = z.object({
	id: z.int(),
	title: z.string(),
	description: z.string(),
	priority: z.enum(["LOW", "MEDIUM", "HIGH", "VITAL"]),
	completed: z.boolean(),
});

const baseUrl = "http://0.0.0.0:8080/tasks/api/v1";
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
		let data = await fetchTodos();
		let result = z.array(TodoSchema).safeParse(data);
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

function TaskApp() {
	let {isLoading, isError, data, error} = useQuery({
		queryKey: ["todos"],
		queryFn: allTodos,
	});
	if (isLoading) return <h1>Loading...</h1>;
	if (isError) return <h1>Error: {error?.message ?? "Ooops!"}</h1>;
	if (!data || data.length === 0) return <h1>No tasks found.</h1>;

	return (
		<div className="border border-red-500 p-10">
			<h1> TaskApp </h1>

			<List withPadding className="flex flex-col gap-2">
				{data.map((todo) => (
					<List.Item
						key={todo.id}
						icon={
							<ThemeIcon
								color="cyan"
								// color={
								// 	todo.priority === "LOW"
								// 		? "green"
								// 		: todo.priority === "MEDIUM"
								// 			? "yellow"
								// 			: todo.priority === "HIGH"
								// 				? "orange"
								// 				: "red"
								// }
								size={10}
								radius="md"
							>
								<Badge />
							</ThemeIcon>
						}
					>
						{/* <Link to="/tasks/1">asadasd</Link> */}
						<Link to="/tasks/$taskId" params={{taskId: todo.id}}>
							<Title order={2}>{todo.title}</Title>
						</Link>
						<Text>{todo.description}</Text>
						<Text>Priority: {todo.priority}</Text>
						<Text>Status: {todo.completed ? "Completed" : "Pending"}</Text>
					</List.Item>
				))}
			</List>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return <TaskApp />;
}
