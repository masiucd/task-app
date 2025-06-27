import {AppShell} from "@mantine/core";
import {createFileRoute, Outlet} from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
	component: AppLayoutComponent,
});

function AppLayoutComponent() {
	return (
		<>
			<AppShell
				header={{
					height: 60,
				}}
				navbar={{
					width: 300,
					breakpoint: "sm",
				}}
				footer={{
					height: 60,
				}}
			>
				<AppShell.Header>header</AppShell.Header>
				<AppShell.Navbar>navbar {/* Navbar content goes here */}</AppShell.Navbar>

				<AppShell.Main>
					<Outlet />
				</AppShell.Main>

				<AppShell.Footer>footer {/* Footer content goes here */}</AppShell.Footer>
			</AppShell>
			{/* <Container
				className="border-2 border-white flex min-h-[calc(100vh-64px)] min-w-[100dvw]"
				component="main"
			>
				<Outlet />
			</Container> */}
		</>
	);
}
