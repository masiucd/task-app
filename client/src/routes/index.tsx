import {Flex, Text, Title} from "@mantine/core";
import {createFileRoute} from "@tanstack/react-router";
import {A} from "@/components/a";
import {PageWrapper} from "@/components/ui/page-wrapper";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<PageWrapper>
			<Title order={1}>Welcome to the Task App</Title>
			<Text>Manage your tasks efficiently and effectively.</Text>
			<Flex gap="md">
				<A to="/app/all-tasks">View All Tasks</A>
			</Flex>
		</PageWrapper>
	);
}
