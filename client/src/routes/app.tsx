import {AppShell, Burger, Container, Group, List, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {createFileRoute, Outlet} from "@tanstack/react-router";
import {A} from "@/components/a";

export const Route = createFileRoute("/app")({
	component: AppLayoutComponent,
});

function AppLayoutComponent() {
	const [opened, {toggle}] = useDisclosure();

	return (
		<AppShell
			header={{
				height: 60,
			}}
			navbar={{width: 300, breakpoint: "sm", collapsed: {mobile: !opened}}}
			footer={{
				height: 60,
			}}
			withBorder={false}
		>
			<AppShell.Header>
				<Container size="lg">
					<Group h="100%" px="md">
						<Title order={3} className="flex items-center justify-center gap-2">
							<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
							<A to="/app/all-tasks" className="text-white">
								Task App
							</A>
						</Title>
					</Group>
				</Container>
			</AppShell.Header>
			<AppShell.Navbar>
				<Container className="flex h-full justify-center">
					<List pt={50}>
						<List.Item>
							<A to="/app/all-tasks">All Tasks</A>
						</List.Item>
						<List.Item>
							<A to="/app/about">About</A>
						</List.Item>
					</List>
				</Container>
			</AppShell.Navbar>

			<AppShell.Main>
				<Outlet />
			</AppShell.Main>

			<AppShell.Footer>
				<Container size="lg">
					<Title order={5} className="text-center">
						&copy; {new Date().getFullYear()} Task App
					</Title>
				</Container>
			</AppShell.Footer>
		</AppShell>
	);
}
