import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import "./App.css";
import {TaskApp} from "./components/task-app";

let queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<TaskApp />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
