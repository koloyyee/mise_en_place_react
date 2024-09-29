/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getTaskById, TaskResponseType, TaskType } from "@/api/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, Params, useLoaderData, useNavigate } from "react-router-dom";
import { PriorityIcon } from "../../components/tasks/priority-icons";


export async function loader({ params }: { params: Params }) {
  const id = Number.parseInt(params.taskId ?? '');
  const resp = await getTaskById({ taskId: id }) as TaskResponseType;
  return { resp };
}

/**
 * A task detail
 */
export default function Task() {
  const { resp } = useLoaderData() as { resp: TaskResponseType };
  const navigate = useNavigate();

  if(!resp.ok && resp.data ) {
   navigate("/app/tasks")
  } 
  const task = resp.data as TaskType; 

  return (
    <main className="mt-5 grid grid-cols-12">
      {/* editable task details if the Assigner and current user are the same person */}
      <div className="col-start-2 col-span-8">
        <h1>{task.name}</h1>
        <p>{task.description}</p>
      </div>

      {/* A sticky detail side  */}
      <Link to={`/app/tasks/edit/${task.id}`}>
        <Button>
          Edit
        </Button>
      </Link>
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
              <PriorityIcon priority={task.priority} />
              {task.priority}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}