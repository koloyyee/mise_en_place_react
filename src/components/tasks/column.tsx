
import { TaskType } from "@/types/task";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PriorityIcon } from "./priority-icons";

const columnsHelper = createColumnHelper<TaskType>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<TaskType, any>[] = [
  columnsHelper.accessor("id", {
    cell: info => info.getValue(),
    header: () => <span>#</span>
  }),
  columnsHelper.accessor("name", {
    cell: info => info.getValue(),
    header: () => <span>Name</span>
  }),
  columnsHelper.accessor("priority", {
    cell: info => {
      const priority: string = info.getValue();
      return (<p><PriorityIcon priority={priority} /> {priority} </p>);
    },
    header: () => <span>Priority</span>
  }),
  columnsHelper.accessor("status", {
    cell: info => info.getValue(),
    header: () => <span>Priority</span>
  })
]
