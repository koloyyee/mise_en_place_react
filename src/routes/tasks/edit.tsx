import { HttpMethod } from "@/api/fetch";
import { deleteTask, getTaskById, TaskType, updateTask } from "@/api/task";
import TaskFormBody from "@/components/tasks/form-body";
import { Params, redirect, useLoaderData } from "react-router-dom";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  switch (request.method) {
    case HttpMethod.Put: {
      console.log(Object.fromEntries(formData));
      const resp = await updateTask({ formData });
      return resp;
    }
    case HttpMethod.Delete: {
      const id = formData.get("id") as string;
      console.log(id);
      await deleteTask(id);
      return redirect("/app/tasks");
    }
    default:
      return null;
  }

}

export async function loader({ params }: { params: Params }) {
  const id = Number.parseInt(params.taskId ?? "");
  const task = await getTaskById({ taskId: id });
  return { task }
}

export default function EditTask() {
  const { task } = useLoaderData() as { task: TaskType };
  return <TaskFormBody isEdit={true} task={task} />
}