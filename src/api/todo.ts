import { z } from "zod";
import { get, post } from "./fetch";

export type TodoType = {
  id?: number;
  name: string;
  note: string;
  username: string;
  status?: "todo" | "done" | "cancelled" | "delay" | "unavailable";
  createdAt?: Date;
  updatedAt?: Date;
}

export const todoSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  note: z.string(),
  username: z.string(),
  status: z.enum(["todo", "done", "cancelled", "delay", "unavailable"]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});



export async function createTodo(formData: TodoType) {
  return await post("/todo", formData);
}

export async function findAllTodos() {
  const data = await get("/todo");
  const json = await data.json();
  console.log({data});
  console.log(json);
  return json
}