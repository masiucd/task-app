import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/app/tasks/$taskId")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/tasks/$taskId"!</div>;
}
