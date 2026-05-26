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
import { useSubmitsDelete } from "@/hooks/use-submit"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"
import { ExportDialog } from "./export-dialog"

export function SubmissionTable({
  data,
  globalFilter,
}: {
  data: {
    submissions: SubmissionsType
  }
  globalFilter: string
}) {
  const { mutateAsync, isPending } = useSubmitsDelete()

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

  const handleDelete = () => {
    const selectedRows = table?.getSelectedRowModel()?.rows ?? []
    const submitIds = selectedRows?.map((row: any) => row?.original?.id)
    if (submitIds.length > 0) {
      mutateAsync({ submitIds }).finally(() => table?.setRowSelection({}))
    }
  }

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
            <ExportDialog
              data={{
                submissions: {
                  ...data?.submissions,
                  submissions:
                    data?.submissions?.submissions?.filter((submission: any) =>
                      table
                        .getSelectedRowModel()
                        ?.rows?.some(
                          (row: any) => row?.original?.id === submission?.id
                        )
                    ) || [],
                },
              }}
            >
              <Button variant="outline" size="icon-sm">
                <Download />
              </Button>
            </ExportDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon-sm"
                  disabled={isPending}
                >
                  {isPending ? <Spinner /> : <Trash2 />}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete {table?.getSelectedRowModel()?.rows?.length}{" "}
                    Submissions
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete the selected submissions?
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isPending}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isPending}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
