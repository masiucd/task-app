import {
	Button,
	Checkbox,
	Flex,
	Group,
	Modal,
	NativeSelect,
	Textarea,
	TextInput,
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateTask} from "@/api/tasks";
import {type Task, TaskSchema} from "@/schemas/task";

export function EditTaskModal(props: {opened: boolean; onClose: () => void; task: Task}) {
	let queryClient = useQueryClient();
	let form = useForm({
		mode: "uncontrolled",
		initialValues: {
			title: props.task.title,
			description: props.task.description,
			priority: props.task.priority,
			completed: props.task.completed,
		},

		validate: {
			title: (value) => (value.length <= 2 ? "Title must be at least 2 characters long" : null),
			description: (value) =>
				value.length <= 5 ? "Description must be at least 5 characters long" : null,
		},
	});

	let mutation = useMutation({
		mutationFn: (formData: Task) => updateTask(formData, props.task.id),
		mutationKey: ["updateTask", props.task.id],
		onSuccess: () => {
			// Invalidate and refetch relevant queries
			queryClient.invalidateQueries({queryKey: ["tasks"]});
			queryClient.invalidateQueries({queryKey: ["task", props.task.id]});
			form.reset();
			props.onClose();
		},
		onError: (error) => {
			console.error("Error updating task:", error);
		},
	});

	return (
		<Modal opened={props.opened} onClose={props.onClose} title={`Edit Task: ${props.task.title}`}>
			<form
				onSubmit={form.onSubmit((values) => {
					let formData = TaskSchema.safeParse({
						...values,
						priority: values.priority.toString().toUpperCase(),
						id: Number(props.task.id),
					});
					if (formData.success) {
						mutation.mutate(formData.data);
					}
				})}
			>
				<Flex direction="column" gap={5}>
					<TextInput
						label="Title"
						defaultValue={props.task.title}
						key={form.key("title")}
						placeholder="Task title"
						required
						mb="md"
						{...form.getInputProps("title")}
					/>
					<Textarea
						label="Description"
						defaultValue={props.task.description}
						key={form.key("description")}
						placeholder="Task description"
						required
						minRows={3}
						mb="md"
						{...form.getInputProps("description")}
					/>
					<NativeSelect
						key={form.key("priority")}
						data={["Low", "Medium", "High", "Vital"]}
						defaultValue={props.task.priority}
						mb="md"
						label="Priority"
						{...form.getInputProps("priority")}
					/>
					<Checkbox
						label="Complete"
						defaultChecked={props.task.completed}
						mb="md"
						key={form.key("completed")}
						{...form.getInputProps("completed", {type: "checkbox"})}
					/>
					<Group justify="flex-end" mt="md">
						<Button
							type="submit"
							radius="md"
							color="blue"
							loading={mutation.isPending}
							aria-disabled={mutation.isPending}
							opacity={mutation.isPending ? 0.5 : 1}
							variant="filled"
						>
							Save
						</Button>
						<Button type="button" radius="md" variant="light" onClick={props.onClose}>
							Cancel
						</Button>
					</Group>
				</Flex>
			</form>
		</Modal>
	);
}
