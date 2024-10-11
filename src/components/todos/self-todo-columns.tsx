import { TodoType } from "@/api/todo";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnsHelper = createColumnHelper<TodoType>();

/* eslint-disable @typescript-eslint/no-explicit-any */
export const columns: ColumnDef<TodoType, any >[] = [
  columnsHelper.accessor("id", {
    cell: info => info.getValue(),
    header: () => <span>#</span>
  }),
  columnsHelper.accessor("name", {
    cell: info => info.getValue(),
    header: () => <span>Name</span>
  }),
  columnsHelper.accessor("status", {
    cell: info => info.getValue(),
    header: () => <span>status</span>
  }),

]