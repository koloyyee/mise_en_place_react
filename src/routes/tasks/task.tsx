/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getTaskById, TaskType } from "@/api/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Params, useLoaderData } from "react-router-dom";
import { PriorityIcon } from "./priority-icons";


export async function loader({ params } : {params : Params}) {
  const id = Number.parseInt(params.taskId ?? '');
  const task = await getTaskById({taskId : id});
  return { task };
}

/**
 * A task detail
 */
export default function Task() {
  const { task } = useLoaderData() as { task: TaskType };


  return (
    <main className="mt-5 grid grid-cols-12">
      {/* editable task details if the Assigner and current user are the same person */}
      <div className="col-start-2 col-span-8">
        <h1>{task.name}</h1>
        <p>{task.description}</p>
      </div>

      {/* A sticky detail side  */}

      {/* fixed top-[3rem] right-[2rem] */}
      <Card className="w-[16rem] h-max col-start-10 col-end-12 ">
        <CardHeader>
          <CardTitle> task details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="assignee">
            <p className="text-slate-400">Assignee:</p>
            <p className="font-bold">{task.assigneeEmail}</p>
          </div>
          <div className="assigner">
            <p className="text-slate-400">Assigner:</p>
            <p className="font-bold">{task.assignerEmail}</p>
          </div>
          <Separator className="my-4" />
          <div className="priority">
            <p className="text-slate-400">priority:</p>
            <p className="font-bold flex gap-2">
              <PriorityIcon priority={task.priority}/>
              {task.priority}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}