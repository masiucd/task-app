import {Button, Card, Flex, Group, Text, Tooltip} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useQuery} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";
import {Pencil} from "lucide-react";
import {z} from "zod/v4-mini";
import {fetchTaskById} from "@/api/tasks";
import {DeleteTaskPopover} from "@/components/task/delete-task-popover";
import {EditTaskModal} from "@/components/task/edit-task-modal";
import {PageWrapper} from "@/components/ui/page-wrapper";
import {TaskBadge} from "@/components/ui/task-badge";
import type {Task} from "@/schemas/task";

export const Route = createFileRoute("/app/$taskId")({
	params: {
		parse: (params) => ({
			taskId: z.number().parse(Number(params.taskId)),
		}),
		stringify: (params) => ({taskId: `${params.taskId}`}),
	},
	component: TaskItemRoute,
});

function TaskItemRoute() {
	let {taskId} = Route.useParams();
	let {
		data: task,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["task", taskId],
		queryFn: () => fetchTaskById(taskId),
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading task: {error.message}</div>;
	if (!task) return <div>Task not found</div>;

	return (
		<div className="mx-auto max-w-2xl">
			<TaskItem task={task} />
		</div>
	);
}

function TaskItem(props: {task: Task}) {
	let [opened, {open, close}] = useDisclosure(false);
	return (
		<PageWrapper className="justify-center md:min-h-[30dvh]">
			<EditTaskModal opened={opened} onClose={close} task={props.task} />
			<Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
				<Card.Section p="md">
					<Flex justify="space-between" align="center" mb="md">
						<Text size="lg" fw={700}>
							Task Details
						</Text>
						<Text size="sm" c="dimmed">
							ID: {props.task.id}
						</Text>
					</Flex>
					<Group justify="space-between" mb="md">
						<Text fw={500}>{props.task.title}</Text>
						<TaskBadge priority={props.task.priority} />
					</Group>

					<Text size="sm" c="dimmed">
						{props.task.description}
					</Text>
				</Card.Section>

				<Flex gap={10} align="center" justify="end">
					<Tooltip label={`Edit ${props.task.title}`}>
						<Button mt="md" radius="md" variant="light" onClick={open}>
							<Pencil size={16} />
						</Button>
					</Tooltip>
					<DeleteTaskPopover task={props.task} />
				</Flex>
			</Card>
		</PageWrapper>
	);
}
