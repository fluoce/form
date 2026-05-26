import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { useMemo, useEffect, useState } from "react"
import { Download, Trash2, X } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { buildColumns } from "./columns"
import { funcNormalizeSubmissions } from "../func/func-normalize-submissions"
import { Button } from "@/components/ui/button"
import { SubmissionsType } from "@/types/submit-types"

export function SubmissionTable({
  data,
  globalFilter,
}: {
  data: {
    submissions: SubmissionsType
  }
  globalFilter: string
}) {
  const rows = useMemo(
    () =>
      data?.submissions ? funcNormalizeSubmissions(data?.submissions) : [],
    [data]
  )

  const columns = useMemo(
    () => (data ? buildColumns(data?.submissions?.formFields) : []),
    [data]
  )

  const filteredRows = useMemo(() => {
    if (!globalFilter) return rows
    const filter = globalFilter.toLowerCase()
    return rows.filter((row: any) =>
      Object.values(row).some((val) =>
        String(val ?? "")
          .toLowerCase()
          .includes(filter)
      )
    )
  }, [rows, globalFilter])

  const table = useReactTable({
    data: filteredRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  useEffect(() => {
    if (globalFilter) {
      table?.setRowSelection({})
    }
  }, [globalFilter])

  const [selectedRow, setSelectedRow] = useState<Record<string, any>>({})

  return (
    <>
      <DataTable onRow={({ row }) => setSelectedRow(row)} table={table} />
      {table?.getSelectedRowModel()?.rows?.length > 0 && (
        <div className="absolute right-1/2 bottom-4 flex items-center gap-4 rounded-xl border-3 bg-background p-2 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="px-2 text-xs font-semibold">
              <span className="text-sm">
                {table?.getSelectedRowModel()?.rows?.length}
              </span>{" "}
              Selected
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon-sm">
              <Download />
            </Button>
            <Button variant="destructive" size="icon-sm">
              <Trash2 />
            </Button>
            <Button
              onClick={() => table?.setRowSelection({})}
              variant="outline"
              size="icon-sm"
            >
              <X />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
