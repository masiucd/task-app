import {Badge, Checkbox, Flex, Group, List, Text, Title, Tooltip} from "@mantine/core";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CheckIcon, Circle} from "lucide-react";
import {useState} from "react";
import {toggleTaskCompleted} from "@/api/tasks";
import {A} from "@/components/a";
import {TaskBadge} from "@/components/ui/task-badge";
import type {Task} from "@/schemas/task";

export function TaskItem(props: {task: Task}) {
	let [completed, setCompleted] = useState(props.task.completed);
	let queryClient = useQueryClient();
	let mutation = useMutation({
		mutationFn: () => toggleTaskCompleted(props.task.id),
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
			<Group pl={5} mt={5}>
				<Text>{props.task.description}</Text>

				<Badge variant="light" radius="xs">
					<Tooltip
						label={completed ? "Task completed" : "Uncompleted task"}
						withArrow
						position="right"
					>
						{completed ? <CheckIcon size={20} /> : <Circle size={20} />}
					</Tooltip>
				</Badge>
			</Group>
		</List.Item>
	);
}
