import {Checkbox, Flex, List, Text, Title} from "@mantine/core";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {toggleTaskCompleted} from "@/api/tasks";
import {A} from "@/components/a";
import {TaskBadge} from "@/components/ui/task-badge";
import {cn} from "@/lib/cn";
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
	return (
		<List.Item key={props.task.id}>
			<Flex align="center" gap={10}>
				<Checkbox
					checked={completed}
					onChange={(e) => {
						setCompleted(e.currentTarget.checked);
						mutation.mutate();
					}}
				/>

				<Flex justify="center" align="center" gap={5} opacity={completed ? 0.5 : 1}>
					<A to="/tasks/$taskId" params={{taskId: props.task.id}}>
						<Title className={cn(completed && "line-through")} order={3}>
							{props.task.title}
						</Title>
					</A>
				</Flex>
				<TaskBadge priority={props.task.priority} />
			</Flex>
			<Text pl={5} mt={5} opacity={completed ? 0.5 : 1}>
				{props.task.description}
			</Text>
		</List.Item>
	);
}
