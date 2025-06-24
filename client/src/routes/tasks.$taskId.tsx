import {Badge, Button, Card, Flex, Group, Image, Modal, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Await, createFileRoute} from "@tanstack/react-router";
import {Pencil, Trash} from "lucide-react";
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
	let {taskId} = Route.useParams();
	console.log("🚀 ~ RouteComponent ~ taskId:", taskId);
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
			<Modal opened={opened} onClose={close} title={`Edit Task: ${props.task.title}`}>
				<p>Hello</p>
			</Modal>
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
					<Button mt="md" radius="md" variant="light" onClick={open}>
						<Pencil size={16} />
					</Button>
					<Button mt="md" radius="md" color="red" variant="light">
						<Trash size={16} />
					</Button>
				</Flex>
			</Card>
		</>
	);
}
