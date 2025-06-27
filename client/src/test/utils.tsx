import {MantineProvider} from "@mantine/core";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {render} from "@testing-library/react";
import type {ReactElement} from "react";

/**
 * Custom render function that includes all necessary providers
 * Use this instead of the regular render from @testing-library/react
 */
export function renderWithProviders(ui: ReactElement) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	return render(
		<QueryClientProvider client={queryClient}>
			<MantineProvider>{ui}</MantineProvider>
		</QueryClientProvider>,
	);
}

/**
 * Creates a mock task for testing
 */
export function createMockTask(overrides = {}) {
	return {
		id: 1,
		title: "Test Task",
		description: "This is a test task",
		priority: "MEDIUM" as const,
		completed: false,
		...overrides,
	};
}

/**
 * Creates multiple mock tasks for testing
 */
export function createMockTasks(count: number) {
	return Array.from({length: count}, (_, index) =>
		createMockTask({
			id: index + 1,
			title: `Test Task ${index + 1}`,
		}),
	);
}
