import {Button, Container, Modal, NativeSelect, Textarea, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTask} from "@/api/tasks";
import {CreateTaskSchema} from "@/schemas/task";

export function AddNewTaskModal(props: {opened: boolean; onClose: () => void}) {
	let queryClient = useQueryClient();
	let form = useForm({
		mode: "uncontrolled",
		initialValues: {
			title: "",
			description: "",
			priority: "MEDIUM",
		},
		validate: {
			title: (value) => (value.length < 3 ? "Title must be at least 3 characters long" : null),
			description: (value) =>
				value.length < 5 ? "Description must be at least 5 characters long" : null,
		},
	});
	let mutation = useMutation({
		mutationFn: createTask,
		onError: (error) => {
			console.error("Error creating task:", error);
		},
		onSuccess: (data) => {
			console.log("Data from mutation:", data);
			// Invalidate tasks query to refetch updated data
			queryClient.invalidateQueries({queryKey: ["tasks"]});
			// queryClient.invalidateQueries({queryKey: ["task", props.task.id]});
			form.reset();
			props.onClose();
		},
	});

	return (
		<Modal opened={props.opened} onClose={props.onClose} title="Add New Task">
			<form
				onSubmit={form.onSubmit((values) => {
					let formData = CreateTaskSchema.safeParse({
						...values,
						completed: false,
					});
					if (!formData.success) {
						console.error("Form validation failed:", formData.error);
						return;
					}
					mutation.mutate(formData.data);
				})}
			>
				<Container size="xs" mb={20} className="flex flex-col gap-4">
					<TextInput
						label="Task title"
						placeholder="Walk the dog..."
						withAsterisk
						key={form.key("title")}
						{...form.getInputProps("title")}
					/>
					<Textarea
						label="Task description"
						placeholder="Why/how/when..."
						withAsterisk
						key={form.key("description")}
						{...form.getInputProps("description")}
					/>
					<NativeSelect
						label="Task priority"
						data={[
							{value: "LOW", label: "Low"},
							{value: "MEDIUM", label: "Medium"},
							{value: "HIGH", label: "High"},
							{value: "VITAL", label: "Vital"},
						]}
						{...form.getInputProps("priority")}
						key={form.key("priority")}
						defaultValue="MEDIUM"
					/>
					<Button type="submit" variant="filled">
						Create Task
					</Button>
				</Container>
			</form>
		</Modal>
	);
}
