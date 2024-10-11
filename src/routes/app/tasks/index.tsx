import { getAllTasks, TaskResponseType, TaskType } from "@/api/task";
import { DataTable } from "@/components/common/data-table";
import { columns } from "@/components/tasks/column";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export async function loader() {
  const resp = await getAllTasks();
  return { resp };
}

/**
 * The index page of the tasks, shows all tasks with pagination.
 */
export default function Tasks() {
  const navigate = useNavigate();
  const { resp } = useLoaderData() as {resp : TaskResponseType };
  const tasks = resp.data as TaskType[];
  useEffect(() => {
    if (!resp.ok) {
      navigate("/");
    } 
  }, [navigate])
  
  /***
   * All the tasks are showing in table format
   */
  // return (
  //     <table>
  //       <thead>
  //         <tr className="text-center">
  //           <th> #</th>
  //           <th> Name</th>
  //           <th> Assignee </th>
  //           <th className="w-[3rem]">priority </th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {tasks.map((task, key) => (
  //           <tr className="text-center" key={key}>
  //             <td>{task.id}</td>
  //             <td>
  //               <Link to={`/app/tasks/${task.id}`}>
  //                 {task.name}
  //               </Link>
  //             </td>
  //             <td>{task.assigneeEmail}</td>
  //             <td className="w-1/2 flex text-center gap-2 justify-between">
  //               <PriorityIcon priority={task.priority} />
  //               {task.priority}
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  // );
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tasks} />
    </div>
  )
}