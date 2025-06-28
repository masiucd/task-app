import {z} from "zod/v4-mini";

let PriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "VITAL"]);
export let TaskSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	priority: PriorityEnum,
	completed: z.boolean(),
});

export let CreateTaskSchema = z.object({
	title: z.string(),
	description: z.string(),
	priority: PriorityEnum,
	completed: z.boolean(),
});

export type Priority = z.infer<typeof PriorityEnum>;
export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
