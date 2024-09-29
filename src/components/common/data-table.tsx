import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

interface DataTableProps<TData extends { id: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

/**
 * This is a Common Table based on TanStack React table and Shadcn Data Table.
 * reference: https://ui.shadcn.com/docs/components/data-table
 * @param {DataTableProps}
 * @returns 
 */
export function DataTable<TData extends { id: number; }, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), });
  const navigate = useNavigate();

  function gotoDetail({ id}: { id: number}) {
    return navigate("/app/tasks/" + id);
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {/* <TableHead></TableHead> */}
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow className="hover:cursor-pointer" key={row.id} data-state={row.getIsSelected() && "selected"} onClick={() => gotoDetail({id : row.original.id })}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>

              )
            })
          )
            : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center"> No Results</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  );

}