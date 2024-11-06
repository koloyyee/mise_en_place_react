import { DateTime } from "luxon";
import { z } from "zod";
import { del, get, post, put } from "./fetch";


export type TaskType = {
  id: number;
  name: string;
  description: string;
  assignerEmail: string;
  assigneeEmail: string;
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
  priority: z.enum(["low", "medium" , "high" , "urgent" , "critical"]),
  status: z.enum(["todo" , "done" , "delay" , "cancelled" , "unavailable"]),
  deadline: z.date(), // return as ISO format
});

export const TaskStatus = Object.freeze({
  todo: "todo",
  done: "done",
  delay: "delay",
  cancelled: "cancelled",
  unavailable: "unavailable"
});


export const Priority = {
  low: "low",
  medium: "medium",
  high: "high",
  urgent: "urgent",
  critical: "critical",
} as const;

export type TaskResponseType = {
  data: TaskType | TaskType[] | null,
  ok: boolean
}


export async function getTaskById({ taskId }: { taskId: number }): Promise<TaskResponseType> {
  const resp = await get("/tasks/" + taskId);
  return { data: await resp.json() as TaskType | null, ok: resp.ok }
}

export async function getAllTasks(): Promise<TaskResponseType>  {
  const resp  = await get("/tasks");
  return { data: await resp.json() as TaskType | null, ok: resp.ok }
}

export async function createTask({ formData }: { formData: TaskType}) {

  if (formData == null) return;
  try {
    const resp = await post("/tasks", formData)
    return await resp.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("unable to post new task.");
    }
  }
}

export async function updateTask({ formData }: { formData: FormData }) {

  const id = formData.get("id");

  const date = formData.get("deadline") as string;
  const parsedDate = DateTime.fromFormat(date, "dd/MM/yyyy, HH:mm:ss");
  const formattedDate = parsedDate.toFormat("yyyy-MM-dd'T'HH:mm:ss");
  formData.set("deadline", formattedDate);

  const data = Object.fromEntries(formData);

  if (data === null || id === null) return;

  const resp = await put(`/tasks/${id}`, data);
  try {

    if (!resp.ok) {
      throw new Error("can't update.");
    }
    return resp;

  } catch (error) {
    if (error instanceof Error) {
      throw new Response(error.message, { status: resp.status });
    }
  }
}



export async function deleteTask(taskId: string) {
  try {
    const resp = await del("/tasks/" + taskId);
    return resp;
  } catch (error) {
    if (error instanceof Error) throw new Error("Failed to delete");
  }
}

/************************************************************* */

export async function getAllBoards() {

  try{
    const resp = await get("/tasks/boards");
    return resp;
  } catch( error) {
    if (error instanceof Error) throw new Error("Failed to fetch boards");
  }
}