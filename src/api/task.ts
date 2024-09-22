import { get, post } from "./fetch";

export type TaskType = {
  id: number;
  name: string;
  description: string;
  assignerEmail: string;
  assigneeEmail: string;
  priority: string; 
  deadline: Date;
}

export const Priority = Object.freeze({
  low: "low",
  medium: "medium",
  high: "high",
  urgent: "urgent",
  critical: "critical",
});


export async function getTaskById({taskId }: {taskId: number}) {
 try {
  const task = await get("/tasks/" + taskId);
  return task;
 } catch (error: unknown) {
  if(error instanceof Error){
    throw new Error(error.message);
  }
 } 
}

export async function getAllTasks() {
  const tasks = await get("/tasks");
  console.log(tasks);
  return tasks;
}

export async function createTask(formData: FormData) {
 
  const data =  Object.fromEntries(formData);
  try {
    const resp = await post("/tasks", data ) 
    return await resp.json();
  } catch (error) {
    if( error instanceof Error) {
      throw new Error("unable to post new task.");
    }
  }
}
