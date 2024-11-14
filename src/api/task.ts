import { BoardType, TaskResponseType, TaskType } from "@/types/task";
import { DateTime } from "luxon";
import { del, get, post, put } from "./fetch";


export async function getTaskById({ taskId }: { taskId: number }): Promise<TaskResponseType> {
  const resp = await get("/tasks/" + taskId);
  return { data: await resp.json() as TaskType | null, ok: resp.ok }
}

export async function getAllTasks(): Promise<TaskResponseType> {
  const resp = await get("/tasks");
  return { data: await resp.json() as TaskType | null, ok: resp.ok }
}

export async function createTask({ formData }: { formData: TaskType }) {

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


export async function getBoards() {

  try {
    const resp = await get("/tasks/boards");
    return await resp.json();
  } catch (error) {
    if (error instanceof Error) throw new Error("Failed to fetch boards");
  }
}

export async function createBoard(formData: BoardType) {
  try {
    console.log({ formData })
    const resp = await post("/tasks/boards", formData);
    console.log(await resp.json());
    return resp;
  } catch (error) {
    if (error instanceof Error) throw new Error("Failed to fetch boards");
  }
}

/***************************************/

export async function getColumns(boardId: string) {
  if (!boardId || boardId.trim() === "") {
    console.error("cannot be empty")
    return
  }

  try {
    console.log({ boardId })
    const resp = await get("/tasks/boards/" + boardId);
    if (resp.status !== 200) {
      throw new Response("Failed to fetch columns", { status: resp.status })
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error("Failed to fetch boards");
  }

}