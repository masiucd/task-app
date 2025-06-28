import {Container} from "@mantine/core";
import type {PropsWithChildren} from "react";
import {cn} from "@/lib/cn";

interface Props {
	className?: string;
	fluid?: boolean;
}

export function PageWrapper(props: PropsWithChildren<Props>) {
	return (
		<Container
			component="section"
			size="lg"
			fluid={props.fluid}
			className={cn("flex flex-col flex-1", props.className)}
		>
			{props.children}
		</Container>
	);
}
