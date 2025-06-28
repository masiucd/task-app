import {Flex, List, Text, Title} from "@mantine/core";
import {createFileRoute} from "@tanstack/react-router";
import {PageWrapper} from "@/components/ui/page-wrapper";

export const Route = createFileRoute("/app/about")({
	component: About,
});

function About() {
	return (
		<PageWrapper>
			<Flex gap={10} direction="column">
				<Flex direction="column" mt={5} mb={20}>
					<Title order={1} mb={10}>
						About Task App
					</Title>
					<Text size="sm" c="dimmed" mt={5}>
						This is a simple task management application built with React and TypeScript.
					</Text>
				</Flex>
				<Flex gap={20}>
					<List spacing="sm">
						<List.Item>
							<Title order={3} size="md">
								Frontend Technologies Used:
							</Title>
						</List.Item>
						<List.Item>
							<a
								className="hover:underline hover:text-blue-500"
								href="https://reactjs.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								React
							</a>
						</List.Item>
						<List.Item>
							<a
								className="hover:underline hover:text-blue-500"
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.typescriptlang.org/"
							>
								TypeScript
							</a>
						</List.Item>
						<List.Item>
							<a
								className="hover:underline hover:text-blue-500"
								target="_blank"
								rel="noopener noreferrer"
								href="https://react-query.tanstack.com/"
							>
								React Query
							</a>
						</List.Item>
						<List.Item>
							<a
								className="hover:underline hover:text-blue-500"
								href="https://mantine.dev/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Mantine UI
							</a>
						</List.Item>
						<List.Item>
							<a
								className="hover:underline hover:text-blue-500"
								href="https://tanstack.com/router/latest"
								target="_blank"
								rel="noopener noreferrer"
							>
								TanStack Router
							</a>
						</List.Item>
					</List>

					<List spacing="sm">
						<List.Item>
							<Title order={3} size="md">
								Backend Technologies Used:
							</Title>
						</List.Item>
						<List.Item>
							<a
								href="https://kotlinlang.org/"
								className="hover:underline hover:text-blue-500"
								target="_blank"
								rel="noopener noreferrer"
							>
								Kotlin
							</a>
						</List.Item>
						<List.Item>
							<a
								href="https://ktor.io/"
								className="hover:underline hover:text-blue-500"
								target="_blank"
								rel="noopener noreferrer"
							>
								KTOR
							</a>
						</List.Item>
						<List.Item>
							<a
								href="https://www.postgresql.org/"
								className="hover:underline hover:text-blue-500"
								target="_blank"
								rel="noopener noreferrer"
							>
								Postgres Database
							</a>
						</List.Item>
					</List>
				</Flex>
			</Flex>
		</PageWrapper>
	);
}
