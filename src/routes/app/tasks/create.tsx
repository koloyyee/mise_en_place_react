import { createTask } from "@/api/task";
import TaskFormBody from "@/components/tasks/form-body";
import { taskSchema } from "@/types/task";
import { redirect } from "react-router-dom";


export async function action({ request }: { request: Request }) {
  // handle the form submission
  const formData = await request.formData() as FormData;
  const deadline = new Date(formData.get("deadline") as string);
  const id = Number.parseInt(formData.get("id") as string);
  try {

    const validatedData = taskSchema.parse({ ...Object.fromEntries(formData), id, deadline });
    const resp = await createTask({ formData: validatedData });
    if (resp.status >= 400) {
      // throw new Response("Server error", { status: resp.status });
      return null;
    }
  } catch (error) {
    console.error(error)
  }

  return redirect("/app/tasks");
}

// TODO: this should be a generic form.
export default function CreateTask() {
  return <TaskFormBody isEdit={false} />
}