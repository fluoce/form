"use client"

import { cn } from "@/lib/utils"
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>
  onRow?: (args: { row: TData }) => void
}

export function DataTable<TData>({
  table,
  className,
  children,
  onRow,
  ...props
}: DataTableProps<TData>) {
  return (
    <div
      className={cn("flex h-full max-h-screen flex-col gap-4", className)}
      {...props}
    >
      {children}
      <div
        className="custom-scroll flex-1 overflow-x-auto overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <Table>
          <TableHeader>
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup?.id}>
                {headerGroup?.headers?.map((header) => (
                  <TableHead
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 10,
                    }}
                    className="max-w-52 truncate"
                    key={header?.id}
                    colSpan={header?.colSpan}
                  >
                    {header?.isPlaceholder ? null : header?.column?.id ===
                      "select" ? (
                      <span className="inline-block w-full truncate">
                        {flexRender(
                          header?.column?.columnDef?.header,
                          header?.getContext()
                        )}
                      </span>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-block w-full cursor-help truncate">
                            {flexRender(
                              header?.column?.columnDef?.header,
                              header?.getContext()
                            )}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {typeof flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          ) === "string" ? (
                            flexRender(
                              header?.column?.columnDef?.header,
                              header?.getContext()
                            )
                          ) : (
                            <div className="max-w-xs wrap-break-word">
                              {flexRender(
                                header?.column?.columnDef?.header,
                                header?.getContext()
                              )}
                            </div>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows?.map((row) => (
                <TableRow
                  key={row?.id}
                  data-state={row?.getIsSelected() && "selected"}
                  className="cursor-pointer"
                  onClick={() => onRow?.({ row: row?.original })}
                >
                  {row?.getVisibleCells()?.map((cell) => (
                    <TableCell key={cell?.id} className="max-w-40 truncate">
                      {flexRender(
                        cell?.column?.columnDef?.cell,
                        cell?.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table?.getAllColumns()?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
