import {Button, Container, Flex, Group, List, Skeleton, Text, Title, Tooltip} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";
import {Plus} from "lucide-react";
import {useMemo} from "react";
import {getAllTasks} from "@/api/tasks";
import {TaskItem} from "@/components/task/task-item";
import {PageWrapper} from "@/components/ui/page-wrapper";
import type {Task} from "../schemas/task";

export const Route = createFileRoute("/app/all-tasks")({
	component: RouteComponent,
});

function RouteComponent() {
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
		<PageWrapper>
			<Title order={1} mt={5} mb={20}>
				All tasks
			</Title>
			<Container size="md" className="w-full " bg="dark" p={20} mb={10}>
				<List className="flex flex-col gap-4" mb={10}>
					{todos?.map((task) => (
						<TaskItem key={task.id} task={task} />
					))}
				</List>
				<Footer todos={todos || []} />
			</Container>
		</PageWrapper>
	);
}

function Footer(props: {todos: Task[]}) {
	let completedCount = useMemo(
		() => props.todos.filter((task) => task.completed).length,
		[props.todos],
	);
	let inProgressCount = useMemo(
		() => props.todos.filter((task) => !task.completed).length,
		[props.todos],
	);
	let totalCount = useMemo(() => props.todos.length, [props.todos]);
	return (
		<Flex justify="space-between">
			<Group>
				<Text size="sm" c="dimmed">
					Total tasks: {totalCount}
				</Text>
				<Text size="sm" c="dimmed">
					Completed tasks: {completedCount}
				</Text>
				<Text size="sm" c="dimmed">
					In progress tasks: {inProgressCount}
				</Text>
			</Group>
			<Tooltip label="Add new task">
				<Button variant="outline" size="xs" radius="sm">
					{/* TODO add modal to add a new task */}
					<Plus />
				</Button>
			</Tooltip>
		</Flex>
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
