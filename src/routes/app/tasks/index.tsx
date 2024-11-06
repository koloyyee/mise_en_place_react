import { getAllTasks, TaskResponseType, TaskType } from "@/api/task";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
    <main>

      <div className="flex flex-col sm: w-max md:w-1/4 ">
        <Form>
          <label htmlFor="name">Create Board</label>
          <Input className="my-5" id="name" name="name" type="text" placeholder="Your New Board" />
          <div className="flex gap-5 justify-between">
            <Input className="max-w-1/4 min-w-[2rem] " type="color" id="colour" name="colour" onChange={(e) => console.log(e.currentTarget.value)} />
            <Button type="submit"> + </Button>
          </div>
        </Form>
      </div>
      {/* Boards goes here. fix values for now */}
      <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-[2rem]">
        {["a", "b", "c","d", "e", "f", "g"].map(() => (
          <Card className={cn("h-[5rem] border-b-[#669c35]  border-b-8 col-span-1")}>
            <CardTitle className={cn("m-3")}> Some Name </CardTitle>
          </Card>
        ))}
      </section>
    </main>

  );
}