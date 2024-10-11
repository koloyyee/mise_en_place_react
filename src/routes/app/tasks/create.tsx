import { createTask } from "@/api/task";
import TaskFormBody from "@/components/tasks/form-body";
import { redirect } from "react-router-dom";


export async function action({ request }: { request: Request }) {
  // handle the form submission
  const formData = await request.formData() as FormData;
  const resp = await createTask({formData});
  if (resp.status >= 400 ) {
      // throw new Response("Server error", { status: resp.status });
      return null;
  }

  return redirect("/app/tasks");
}

// TODO: this should be a generic form.
export default function CreateTask() {
  return <TaskFormBody isEdit={false} />
}