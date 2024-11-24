import { BoardType, ColType, ItemMutation } from "@/types/task";
import { DateTime } from "luxon";
import { del, get, post, put } from "./fetch";


export async function getTaskById({ taskId }: { taskId: number }) {
	return await get("/tasks/" + taskId);
}

export async function getAllTasks() {
	return await get("/tasks");
}

export async function createTask(formData: FormData) {
	
	const deadline = formData.get("deadline");
  let deadlineFormatted = null;

  if (typeof deadline === "string") {
    const dateTime = DateTime.fromFormat(deadline, "dd/MM/yyyy, HH:mm:ss", { zone: "UTC" });
    if (dateTime.isValid) {
      deadlineFormatted = dateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss");
    } else {
      console.error("Invalid DateTime object:", dateTime.invalidExplanation);
    }
  }

	const item = Object.fromEntries(formData);
	let data = {...item, orderNum: Number(item.orderNum), columnId: Number(item.columnId) , deadline : deadlineFormatted}
	console.log(data)
	if (formData == null) {
		console.error("form body missing");
		return;
	};
	return await post(`/tasks/boards/${item.boardId}/items`, data)
}

// export async function updateTaskOrder(boardId: string, itemId: number, formData: FormData) {
export async function updateTaskOrder(formData: FormData) {
	if (!formData) {
		console.error("item is empty");
		return;
	}
	const id = String(formData.get("id"));
	const boardId = String(formData.get("boardId"));
	const item = Object.fromEntries(formData) as unknown as ItemMutation;
	return await put("/tasks/boards/" + boardId + "/items/" + id + "/rearrange", item);
}

export async function updateTask({ formData }: { formData: FormData }) {

	const id = formData.get("id");

	const date = formData.get("deadline") as string;
	const parsedDate = DateTime.fromFormat(date, "dd/MM/yyyy, HH:mm:ss");
	const formattedDate = parsedDate.toFormat("yyyy-MM-dd'T'HH:mm:ss");
	formData.set("deadline", formattedDate);

	const data = Object.fromEntries(formData);

	if (data === null || id === null) return;

	return await put(`/tasks/${id}`, data);
	// throw new Response(error.message, { status: resp.status });
}


export async function deleteTask(taskId: string) {
	if (!taskId || taskId.trim() === "") {
		console.error("Task Id cannot be empty")
		return;
	}
	return await del("/tasks/" + taskId);
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
	if (formData === null) {
		console.error("Board data missing");
		return;
	}
	return await post("/tasks/boards", formData);
}

/***************************************/

// export async function getColumns(boardId: string) {
//   if (!boardId || boardId.trim() === "") {
//     console.error("cannot be empty")
//     return
//   }
//   console.log({ boardId })
//   return await get("/tasks/boards/" + boardId);
// }

export async function createColumn(formData: FormData) {
	if (formData === null) {
		console.error("Form Data is missing")
		return;
	}
	const newCol: ColType = Object.fromEntries(formData) as unknown as ColType;
	const resp = await post(`/tasks/boards/${newCol.boardId}/columns`, newCol)
	console.log({ resp })
	return resp;
}