import {AppShell, Container, List, Title} from "@mantine/core";
import {createFileRoute, Outlet} from "@tanstack/react-router";
import {A} from "@/components/a";

export const Route = createFileRoute("/app")({
	component: AppLayoutComponent,
});

function AppLayoutComponent() {
	return (
		<AppShell
			header={{
				height: 60,
			}}
			navbar={{
				width: 200,
				breakpoint: "sm",
			}}
			footer={{
				height: 60,
			}}
		>
			<AppShell.Header>
				<Container size="lg">
					<Title order={3}>
						<A to="/app/all-tasks" className="text-white">
							Task App
						</A>
					</Title>
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
