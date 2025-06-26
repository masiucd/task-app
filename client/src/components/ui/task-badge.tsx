import type {Priority} from "@/schemas/task";
import {Badge} from "@mantine/core";

interface Props {
	priority: Priority;
	variant?: "light" | "filled";
}

export function TaskBadge(props: Props) {
	return (
		<Badge autoContrast color={colorByPriority(props.priority)} variant={props.variant || "light"}>
			{props.priority}
		</Badge>
	);
}

function colorByPriority(priority: Priority) {
	switch (priority) {
		case "HIGH":
			return "red";
		case "MEDIUM":
			return "yellow";
		case "LOW":
			return "green";
		case "VITAL":
			return "gray";
		default:
			return "gray";
	}
}
