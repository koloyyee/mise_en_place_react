import { getAllTasks, TaskResponseType, TaskType } from "@/api/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";

export async function loader() {
  const resp = await getAllTasks();
  return { resp };
}

/**
 * The index page of the tasks, shows all tasks with pagination.
 */
export default function Tasks() {
  const navigate = useNavigate();
  const { resp } = useLoaderData() as { resp: TaskResponseType };
  const tasks = resp.data as TaskType[];
  useEffect(() => {
    if (!resp.ok) {
      navigate("/");
    }
  }, [navigate])


  // return (
  //   <div className="container mx-auto py-10">
  //     <DataTable columns={columns} data={tasks} />
  //   </div>
  // )

  // 2 parts:
  // 1: create new board with a mini form with a colour picker and 
  return (
    <main className="flex flex-col sm: w-max md:w-1/4 ">
      <Form>
        <label htmlFor="name">Create Board</label>
        <Input  className="my-5" id="name" name="name" type="text" placeholder="Your New Board" />
        <div className="flex gap-5 justify-between">
          <Input className="w-1/4" type="color" id="colour" name="colour" />
          <Button type="submit"> + </Button>
        </div>
      </Form>
      {/* Boards goes here. */}
    </main>

  );
}