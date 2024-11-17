import { BoardType, ItemMutation, TaskType } from "@/types/task";
import { DateTime } from "luxon";
import { del, get, post, put } from "./fetch";


export async function getTaskById({ taskId }: { taskId: number }) {
  return await get("/tasks/" + taskId);
}

export async function getAllTasks(){
  return await get("/tasks");
}

export async function createTask({ formData }: { formData: TaskType }) {

  if (formData == null) {
    console.error("form body missing");
    return;
  };
  return await post("/tasks", formData)
}

// export async function updateTaskOrder(boardId: string, itemId: number, formData: FormData) {
export async function updateTaskOrder(boardId: string, itemId: number, formData: ItemMutation) {
  if(!formData) {
    console.error("item is empty");
    return;
  }
  console.log(JSON.stringify(formData))
  return await put("/tasks/boards/" + boardId + "/items/" + itemId + "/rearrange", formData);
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
  return await get("/tasks/boards");
}

export async function getBoard(boardId: string) {
  if (!boardId || !boardId.trim()) {
    console.error("cannot be null or empty")
    return;
  }
  return await get("/tasks/boards/" + boardId);
}

export async function createBoard(formData: BoardType) {
  try {
    console.log({ formData })
    const resp = await post("/tasks/boards", formData);
    console.log(resp);
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
  console.log({ boardId })
  return await get("/tasks/boards/" + boardId);
}
