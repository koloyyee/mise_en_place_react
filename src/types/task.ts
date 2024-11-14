import { z } from "zod";

export type TaskType = {
  id?: number;
  name: string;
  description: string;
  assignerEmail: string;
  assigneeEmail: string;
  order: number;
  columnId: string;
  priority: "low" | "medium" | "high" | "urgent" | "critical";
  status: "todo" | "done" | "delay" | "cancelled" | "unavailable";
  deadline: string; // return as ISO format 
}

export const taskSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  assignerEmail: z.string(),
  assigneeEmail: z.string(),
  order: z.number(),
  columnId: z.string(),
  priority: z.enum(["low", "medium", "high", "urgent", "critical"]),
  status: z.enum(["todo", "done", "delay", "cancelled", "unavailable"]),
  deadline: z.string(), // return as ISO format
});

export const TaskStatus = Object.freeze({
  todo: "todo",
  done: "done",
  delay: "delay",
  cancelled: "cancelled",
  unavailable: "unavailable"
});

/**
 * Priority is a constant enum whe creating or updating a task / item
 */
export const Priority = {
  low: "low" as const,
  medium: "medium" as const,
  high: "high" as const,
  urgent: "urgent" as const,
  critical: "critical" as const,
}

export type TaskResponseType = {
  data: TaskType | TaskType[] | null,
  ok: boolean
}

/**
 * Intent is a constant enum show the intent of each field as a type for different actions.
 */
export const Intent = {
  createColumn: "newColumn" as const,
  updateColumn: "updateColumn" as const,
  createItem: "createItem" as const,
  moveItem: "moveItem" as const,
  moveColumn: "moveColumn" as const,
  updateBoardName: "updateBoardName" as const,
  deleteBoard: "deleteBoard" as const,
  createBoard: "createBoard" as const,
  deleteCard: "deleteCard" as const,
}


export const ContentTypes = {
  card: "application/mep-card" as const,
  column: "application/mep-column" as const,
}

export type BoardType = {
  id?: string;
  name: string;
  username?: string;
  colour: string;
  createdAt?: Date | null
}

export const boardSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  username: z.string().optional(),
  colour: z.string(),
  createdAt: z.date().nullable().optional(),
});

export const ItemMutationFields = {
  id: "id",
  columnId: "columnId",
  order: "order",
  name: "name",
} as const;

export type ItemMutation = {
  id: string;
  columnId: string;
  order: number;
  name: string;
};