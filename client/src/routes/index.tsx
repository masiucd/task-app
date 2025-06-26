import {getAllTasks} from "@/api/tasks";
import {TaskBadge} from "@/components/ui/task-badge";
import {Checkbox, Container, Flex, List, Skeleton, Text, Title} from "@mantine/core";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";
import {useState} from "react";
import type {z} from "zod/v4-mini";
import {A} from "../components/a";
import {baseUrl} from "../lib/constants";
import type {TaskSchema} from "../schemas/task";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	let {
		data: todos,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["tasks"],
		queryFn: getAllTasks,
	});

	if (isLoading) return <TasksLoader />;
	if (error) return <div>Error loading tasks: {error.message}</div>;

	return (
		<div>
			<Title order={1}>All tasks</Title>
			<Container size="md" className="border-2">
				<List className="flex flex-col gap-4">
					{todos?.map((task) => (
						<TaskItem key={task.id} task={task} />
					))}
				</List>
			</Container>
			<div>Footer actions can go here, like creating a new task or filtering tasks.</div>
		</div>
	);
}

function TaskItem(props: {task: z.infer<typeof TaskSchema>}) {
	let [completed, setCompleted] = useState(props.task.completed);
	let queryClient = useQueryClient();
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
		onSuccess: () => {
			// Invalidate tasks query to refetch updated data
			queryClient.invalidateQueries({queryKey: ["tasks"]});
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
				<TaskBadge priority={props.task.priority} />
			</Flex>
			<Text>{props.task.description}</Text>
			<Text>{completed ? "Completed" : "In progress"}</Text>
		</List.Item>
	);
}

function TasksLoader() {
	return Array.from({length: 10}).map((_, i) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: We can use Index as a key here since this is a static list
		<Flex key={i} direction="column" gap={10}>
			<Skeleton height={12} radius="xl" mb={1} />
			<Skeleton height={8} mt={6} radius="xl" mb={1} />
			<Skeleton height={8} mt={6} width="70%" radius="xl" mb={1} />
		</Flex>
	));
}
