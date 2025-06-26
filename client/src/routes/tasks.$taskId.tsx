import {
	Badge,
	Button,
	Card,
	Flex,
	Group,
	Image,
	Modal,
	Popover,
	Text,
	Tooltip,
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useMutation} from "@tanstack/react-query";
import {Await, createFileRoute, useNavigate} from "@tanstack/react-router";
import {Pencil, Trash} from "lucide-react";
import {useEffect} from "react";
import {z} from "zod/v4-mini";
import {baseUrl} from "../lib/constants";
import {TaskSchema} from "../schemas/task";

async function fetchTaskById(taskId: number) {
	let response = await fetch(`${baseUrl}/task/${taskId}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch task with ID ${taskId}`);
	}
	let data = await response.json();
	return TaskSchema.parse(data);
}

export const Route = createFileRoute("/tasks/$taskId")({
	params: {
		parse: (params) => ({
			taskId: z.number().parse(Number(params.taskId)),
		}),
		stringify: (params) => ({taskId: `${params.taskId}`}),
	},
	loader: async ({params}) => ({
		task: fetchTaskById(params.taskId),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	let {task} = Route.useLoaderData();
	return (
		<div className="mx-auto max-w-2xl">
			<Await promise={task} fallback={<div>Loading...</div>}>
				{(task) => <TaskItem task={task} />}
			</Await>
		</div>
	);
}

function TaskItem(props: {task: z.infer<typeof TaskSchema>}) {
	let [opened, {open, close}] = useDisclosure(false);

	return (
		<>
			<EditModal opened={opened} onClose={close} task={props.task} />
			<Card shadow="sm" padding="lg" radius="md" withBorder>
				<Card.Section>
					<Image
						src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
						height={160}
						alt="Norway"
					/>
				</Card.Section>

				<Group justify="space-between" mt="md" mb="xs">
					<Text fw={500}>{props.task.title}</Text>
					<Badge color="pink">{props.task.priority}</Badge>
				</Group>

				<Text size="sm" c="dimmed">
					{props.task.description}
				</Text>

				<Flex gap={10} align="center" justify="end">
					<Tooltip label={`Edit ${props.task.title}`}>
						<Button mt="md" radius="md" variant="light" onClick={open}>
							<Pencil size={16} />
						</Button>
					</Tooltip>
					<DeleteTaskPopover task={props.task} />
				</Flex>
			</Card>
		</>
	);
}

function EditModal(props: {
	opened: boolean;
	onClose: () => void;
	task: z.infer<typeof TaskSchema>;
}) {
	return (
		<Modal opened={props.opened} onClose={props.onClose} title={`Edit Task: ${props.task.title}`}>
			<p>Hello</p>
		</Modal>
	);
}

let DeleteTaskMutationSchema = z.object({
	ok: z.boolean(),
});
function DeleteTaskPopover(props: {task: z.infer<typeof TaskSchema>}) {
	let navigate = useNavigate();
	let mutation = useMutation({
		mutationFn: async () => {
			const res = await fetch(`${baseUrl}/${props.task.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!res.ok) {
				throw new Error(`Failed to delete task with ID ${props.task.id}`);
			}
			let data = await res.json();
			return DeleteTaskMutationSchema.parse(data);
		},
	});

	useEffect(() => {
		if (mutation.isSuccess && mutation.data.ok) {
			navigate({to: "/"});
		}
	}, [mutation.isSuccess, mutation.data, navigate]);

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
					<Text size="xs" color="red">
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
