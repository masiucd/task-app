import {Button, Container, Flex, Group, List, Skeleton, Text, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useQuery} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";
import {Plus} from "lucide-react";
import {useMemo} from "react";
import {getAllTasks} from "@/api/tasks";
import {AddNewTaskModal} from "@/components/task/add-new-task";
import {TaskItem} from "@/components/task/task-item";
import {PageWrapper} from "@/components/ui/page-wrapper";
import type {Task} from "../schemas/task";

export const Route = createFileRoute("/app/all-tasks")({
	component: RouteComponent,
});

function RouteComponent() {
	let {data, isLoading, error} = useQuery({
		queryKey: ["tasks"],
		queryFn: getAllTasks,
	});

	if (isLoading) return <TasksLoader />;
	if (error) return <div>Error loading tasks: {error.message}</div>;

	return (
		<PageWrapper>
			<Flex direction="column" mt={5} mb={20}>
				<Title order={1}>All tasks</Title>
				<Text size="sm" c="dimmed">
					Manage your tasks efficiently and effectively.
				</Text>
			</Flex>
			<Container size="lg" className="w-full" bg="dark" p={20} mb={10}>
				<List className="flex flex-col gap-4" mb={10}>
					{data?.map((task) => (
						<TaskItem key={task.id} task={task} />
					))}
				</List>
				<Footer tasks={data ?? []} />
			</Container>
		</PageWrapper>
	);
}

function Footer(props: {tasks: Task[]}) {
	let completedCount = useMemo(
		() => props.tasks.filter((task) => task.completed).length,
		[props.tasks],
	);
	let inProgressCount = useMemo(
		() => props.tasks.filter((task) => !task.completed).length,
		[props.tasks],
	);
	let totalCount = useMemo(() => props.tasks.length, [props.tasks]);
	return (
		<Flex justify="space-between">
			<Group>
				<Text size="sm" c="dimmed">
					Total tasks: {totalCount}
				</Text>
				<Text size="sm" c="dimmed">
					Completed tasks: {completedCount}
				</Text>
				<Text c="dimmed">In progress tasks: {inProgressCount}</Text>
			</Group>
			<AddNewTaskButton />
		</Flex>
	);
}

function AddNewTaskButton() {
	let [opened, {open, close}] = useDisclosure(false);
	return (
		<>
			<AddNewTaskModal opened={opened} onClose={close} />
			<Button
				variant="light"
				leftSection={<Plus size={16} />}
				size="xs"
				onClick={open}
				className="flex items-center gap-2"
			>
				Add Task
			</Button>
		</>
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
