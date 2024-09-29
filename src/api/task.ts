import { DateTime } from "luxon";
import { del, get, post, put } from "./fetch";


export type TaskType = {
  id: number;
  name: string;
  description: string;
  assignerEmail: string;
  assigneeEmail: string;
  priority: typeof Priority;
  status: typeof TaskStatus;
  deadline: string; // return as ISO format 
}

export const TaskStatus = {
  todo: "todo",
  done: "done",
  delay: "delay",
  cancelled: "cancelled",
  unavailable: "unavailable"
} as const;


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

export async function createTask({ formData }: { formData: FormData }) {

  const data = Object.fromEntries(formData);

  if (data == null) return;
  try {
    const resp = await post("/tasks", data)
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
    console.log(resp);
    return resp;
  } catch (error) {
    if (error instanceof Error) throw new Error("Failed to delete");
  }
}