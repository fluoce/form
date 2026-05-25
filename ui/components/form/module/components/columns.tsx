// components/result-submissions/columns.tsx
import { ColumnDef } from "@tanstack/react-table"
import { SubmissionsType } from "@/types/submit-types"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { NormalizedSubmissionRow } from "../func/func-normalize-submissions"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const staticColumns: ColumnDef<NormalizedSubmissionRow>[] = [
  {
    accessorKey: "status",
    header: "Type",
    cell: ({ getValue }) => {
      const v = getValue<string>()
      return (
        <Badge
          className={cn(
            "text-[11px] lowercase",
            v == "COMPLETED" ? "text-emerald-500" : "text-muted-foreground"
          )}
          variant="outline"
        >
          {v}
        </Badge>
      )
    },
  },
  {
    accessorKey: "answeredCount",
    header: "Answers",
  },
  {
    accessorKey: "device",
    header: "Device",
    cell: ({ getValue }) => (
      <span className="capitalize">{getValue<string>() ?? "—"}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "StartedAt",
    cell: ({ getValue }) => {
      const v = getValue<string | null>()
      if (!v) return "—"
      const dateObj = new Date(v)
      return (
        <span className="flex flex-col text-xs leading-tight">
          <span>{format(dateObj, "HH:mm")}</span>
          <span className="text-muted-foreground">
            {format(dateObj, "dd-MM-yyyy")}
          </span>
        </span>
      )
    },
  },
  {
    accessorKey: "completedAt",
    header: "CompletedAt",
    cell: ({ getValue }) => {
      const v = getValue<string | null>()
      if (!v) return "—"
      const dateObj = new Date(v)
      return (
        <span className="flex flex-col text-xs leading-tight">
          <span>{format(dateObj, "HH:mm")}</span>
          <span className="text-muted-foreground">
            {format(dateObj, "dd-MM-yyyy")}
          </span>
        </span>
      )
    },
  },
]

function buildFieldColumns(
  formFields: SubmissionsType["formFields"]
): ColumnDef<NormalizedSubmissionRow>[] {
  return formFields.map((field) => ({
    id: field?.id,
    accessorKey: field?.id,
    header: field?.config?.label,
    cell: ({ getValue }) => {
      const v = getValue<string | number | boolean | null>()
      if (v === null || v === undefined)
        return <span className="text-muted-foreground">—</span>
      if (typeof v === "boolean") return v ? "Yes" : "No"
      return <span>{String(v)}</span>
    },
  }))
}

export function buildColumns(
  formFields: SubmissionsType["formFields"]
): ColumnDef<NormalizedSubmissionRow>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="mr-0.5 border-none bg-background"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="mr-0.5"
          onClick={(e) => e.stopPropagation()}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...buildFieldColumns(formFields),
    ...staticColumns,
  ]
}
