import {useQuery} from "@tanstack/react-query";

const baseUrl = "http://0.0.0.0:8080/tasks/api/v1";
async function fetchTodos() {
	try {
		let response = await fetch(baseUrl);
		let data = await response.json();
		return data;
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error("Error fetching todos:", error);
		throw error;
	}
}

export function TaskApp() {
	let {isLoading, isError, data, error} = useQuery({
		queryKey: ["todos"],
		queryFn: fetchTodos,
	});
	if (isLoading) return <h1>Loading...</h1>;
	if (isError) return <h1>Error: {error?.message ?? "Ooops!"}</h1>;

	console.log(data);

	return (
		<div className="border border-red-500 p-10">
			<h1> TaskApp </h1>
		</div>
	);
}
