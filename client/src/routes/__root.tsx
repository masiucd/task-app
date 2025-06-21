import {MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Link, Outlet, createRootRoute} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import "../index.css";

let queryClient = new QueryClient();

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="flex gap-2 p-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
			</div>
			<hr />

			<QueryClientProvider client={queryClient}>
				<MantineProvider>
					<Outlet />
				</MantineProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
			<TanStackRouterDevtools />
		</>
	),
});
