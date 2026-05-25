"use client"

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table"
import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { Download, RotateCw, Search, Trash2, X } from "lucide-react"

import { DataTable } from "@/components/data-table"
import { PageSpinner } from "@/components/shared/loader-r"
import { useSubmits } from "@/hooks/use-submit"
import { buildColumns } from "./columns"
import { funcNormalizeSubmissions } from "../func/func-normalize-submissions"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function ResultSubmissions() {
  const { formId } = useParams<{ formId: string }>()

  const { data, isLoading, refetch, isFetching } = useSubmits({ formId })

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const rows = useMemo(
    () =>
      data?.data?.submissions
        ? funcNormalizeSubmissions(data.data.submissions)
        : [],
    [data]
  )

  const columns = useMemo(
    () => (data?.data ? buildColumns(data.data.submissions.formFields) : []),
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
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return isLoading ? (
    <PageSpinner />
  ) : (
    <div
      className={cn(
        "flex w-full flex-col gap-4 p-2",
        isFetching && "opacity-50"
      )}
    >
      <div className="flex items-center gap-2 text-sm">
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          variant="outline"
          size="icon-sm"
        >
          <RotateCw className={cn(isFetching && "animate-spin")} />
        </Button>
        <InputGroup className="w-fit">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search submissions . . ."
            value={globalFilter}
            onChange={(e) => {
              table?.setRowSelection({})
              setGlobalFilter(e?.target?.value)
            }}
          />
        </InputGroup>
      </div>
      <DataTable table={table} />
      {table?.getSelectedRowModel()?.rows?.length > 0 && (
        <div className="absolute right-1/2 bottom-6 flex items-center gap-4 rounded-xl border-3 bg-background p-2 shadow-xl">
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
    </div>
  )
}
