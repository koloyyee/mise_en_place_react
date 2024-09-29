import { HttpMethod } from "@/api/fetch";
import { deleteTask, getTaskById, TaskType, updateTask } from "@/api/task";
import TaskFormBody from "@/components/tasks/form-body";
import { useEffect } from "react";
import { Params, redirect, useLoaderData, useNavigate } from "react-router-dom";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  switch (request.method) {
    case HttpMethod.Put: {
      const resp = await updateTask({ formData });
      console.log(resp)
      if(resp?.ok) {
        return redirect("/app/tasks/" + formData.get("id"));
      }
      return null;
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
  const data = await getTaskById({ taskId: id });
  console.log(data)
  return { data }
}

export default function EditTask() {
  const { data } = useLoaderData() as { data: {task: TaskType, ok:boolean }};
  const navigate = useNavigate();

  console.log( {data});
  useEffect(() => {
    if(!data.ok) {
     navigate("/");
    }
  }, [navigate])
  return <TaskFormBody isEdit={true} task={data.task} />
}