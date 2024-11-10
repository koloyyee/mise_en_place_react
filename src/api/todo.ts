import { z } from "zod";
import { get, post, put } from "./fetch";


export type TodoType = {
  id?: number;
  name: string;
  note: string;
  username: string;
  isDone: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export const todoSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  note: z.string(),
  username: z.string(),
  isDone: z.boolean(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});



export async function createTodo(formData: TodoType) {
  return await post("/todo", formData);
}

export async function updateTodo(formData: TodoType) {
  console.log({formData})
  return await put("/todo/" + formData.id, formData);
}

export async function findAllTodos(): Promise<TodoType[]> {
  const data = await get("/todo");
  const json = await data.json();
  return json
}