import { getAllTasks, TaskType } from "@/api/task";
import { Link, redirect, useLoaderData } from "react-router-dom";
import { PriorityIcon } from "./priority-icons";

export async function loader() {
  const tasks = await getAllTasks();
  if( tasks.status ) {
    return redirect("/");
  }
  return { tasks };
}

/**
 * The index page of the tasks, shows all tasks with pagination.
 */
export default function Tasks() {
  const { tasks } = useLoaderData() as { tasks: TaskType[] };

  /***
   * All the tasks are showing in table format
   */
  return (
      <table>
        <thead>
          <tr className="text-center">
            <th> #</th>
            <th> Name</th>
            <th> Assignee </th>
            <th className="w-[3rem]">priority </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, key) => (
            <tr className="text-center" key={key}>
              <td>{task.id}</td>
              <td>
                <Link to={`/app/tasks/${task.id}`}>
                  {task.name}
                </Link>
              </td>
              <td>{task.assigneeEmail}</td>
              <td className="w-1/2 flex text-center gap-2 justify-between">
                <PriorityIcon priority={task.priority} />
                {task.priority}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );

}