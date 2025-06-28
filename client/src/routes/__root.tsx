import {createTheme, MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import "../index.css";

let queryClient = new QueryClient();
let theme = createTheme({
	colors: {
		"ocean-blue": [
			"#7AD1DD",
			"#5FCCDB",
			"#44CADC",
			"#2AC9DE",
			"#1AC2D9",
			"#11B7CD",
			"#09ADC3",
			"#0E99AC",
			"#128797",
			"#147885",
		],
		"bright-pink": [
			"#F0BBDD",
			"#ED9BCF",
			"#EC7CC3",
			"#ED5DB8",
			"#F13EAF",
			"#F71FA7",
			"#FF00A1",
			"#E00890",
			"#C50E82",
			"#AD1374",
		],
		gray: [
			"#F8F9FA",
			"#E9ECEF",
			"#DEE2E6",
			"#CED4DA",
			"#ADB5BD",
			"#6C757D",
			"#495057",
			"#343A40",
			"#212529",
			"#121416",
		],
		blue: [
			"#E3F2FD",
			"#BBDEFB",
			"#90CAF9",
			"#64B5F6",
			"#42A5F5",
			"#2196F3",
			"#1E88E5",
			"#1976D2",
			"#1565C0",
			"#0D47A1",
		],
	},
	radius: {
		xs: "4px",
		sm: "6px",
		md: "8px",
		lg: "10px",
		xl: "12px",
	},
});

export const Route = createRootRoute({
	component: () => (
		<>
			<QueryClientProvider client={queryClient}>
				<MantineProvider defaultColorScheme="auto" theme={theme}>
					<Outlet />
				</MantineProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
			<TanStackRouterDevtools />
		</>
	),
});
