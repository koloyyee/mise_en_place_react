import { del, get, post, put } from "./fetch";


export type TaskType = {
  id: number;
  name: string;
  description: string;
  assignerEmail: string;
  assigneeEmail: string;
  priority: "low" | "medium" | "high" | "urgent" | "critical";
  status: "todo" | "done" | "delay";
  deadline: Date;
}

export const Priority = Object.freeze({
  low: "low",
  medium: "medium",
  high: "high",
  urgent: "urgent",
  critical: "critical",
});


export async function getTaskById({ taskId }: { taskId: number }) {
  try {
    const task = await get("/tasks/" + taskId);
    return task;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getAllTasks() {
  const tasks = await get("/tasks");
  return tasks;
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

  const data = Object.fromEntries(formData);
  const id = formData.get("id");
  if (data === null || id === null) return;

  const resp = await put(`/tasks/${id}`, data);
  try {
    console.log(resp);
    const json = await resp.json();
    console.log(json);
    if (json.status !== 200) {
      throw new Error("can't update.");
    }
    return resp.text;
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