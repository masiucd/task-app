import {z} from "zod/v4-mini";

export let TaskSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	priority: z.enum(["LOW", "MEDIUM", "HIGH", "VITAL"]),
	completed: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;
