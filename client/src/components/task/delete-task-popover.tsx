import {Button, Popover, Text, Tooltip} from "@mantine/core";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "@tanstack/react-router";
import {Trash} from "lucide-react";
import {deleteTask} from "@/api/tasks";
import type {Task} from "../../schemas/task";

export function DeleteTaskPopover(props: {task: Task}) {
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: () => deleteTask(props.task.id),
		onSuccess: () => {
			navigate({to: "/app/all-tasks"});
		},
		mutationKey: ["deleteTask", props.task.id],
	});

	return (
		<Popover width={200} position="bottom" withArrow shadow="md">
			<Popover.Target>
				<Tooltip label={`Delete ${props.task.title}`}>
					<Button mt="md" radius="md" color="red" variant="light">
						<Trash size={16} />
					</Button>
				</Tooltip>
			</Popover.Target>
			<Popover.Dropdown>
				<Text size="xs">Are you sure you want to delete task {props.task.title}?</Text>
				{mutation.isError && (
					<Text size="xs" c="red">
						{mutation.error.message}
					</Text>
				)}
				<Button
					mt="md"
					radius="md"
					color="red"
					variant="light"
					opacity={mutation.isPending ? 0.5 : 1}
					onClick={() => {
						mutation.mutate();
					}}
					aria-disabled={mutation.isPending}
					loading={mutation.isPending}
				>
					Delete
				</Button>
			</Popover.Dropdown>
		</Popover>
	);
}
