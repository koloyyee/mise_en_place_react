import { geTaskTypes, TaskType } from "@/api/task";
import { Link, useLoaderData } from "react-router-dom";
import { StatusIcon } from "./status-icons";

export async function loader() {
  const tasks = await geTaskTypes();
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
          <th className="w-[3rem]">Status </th>
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
            <td>{task.assignee}</td>
            <td className="w-1/2 flex text-center gap-2 justify-between">
                <StatusIcon status={task.status} />
                {task.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );

}