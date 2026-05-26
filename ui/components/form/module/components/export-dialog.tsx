import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SubmissionsType } from "@/types/submit-types"
import { ReactNode, useState } from "react"
import { funcNormalizeSubmissionsForCard } from "../func/func-normalize-submissions"
import { Button } from "@/components/ui/button"
import {
  funcExportToCsv,
  funcExportToExcel,
  funcExportToPdf,
} from "../func/func-export-submissions"
import { Checkbox } from "@/components/ui/checkbox"

export function ExportDialog({
  children,
  data,
}: {
  children: ReactNode
  data: {
    submissions: SubmissionsType
  }
}) {
  const [open, setOpen] = useState(false)

  const [type, setType] = useState<"CSV" | "Excel" | "PDF">("Excel")

  const dataForExport = funcNormalizeSubmissionsForCard(data?.submissions) || []

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export {dataForExport?.length} Submissions</DialogTitle>
          <DialogDescription>
            Download {dataForExport?.length} form submissions as an Excel, CSV
            or PDF file.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={type === "Excel"}
              onCheckedChange={() => setType("Excel")}
              id="export-excel"
            />
            <label
              htmlFor="export-excel"
              className="cursor-pointer text-sm font-medium select-none"
            >
              Excel (.xlsx)
            </label>
          </div>
          <div className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={type === "CSV"}
              onCheckedChange={() => setType("CSV")}
              id="export-csv"
            />
            <label
              htmlFor="export-csv"
              className="cursor-pointer text-sm font-medium select-none"
            >
              CSV (.csv)
            </label>
          </div>
          <div className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={type === "PDF"}
              onCheckedChange={() => setType("PDF")}
              id="export-pdf"
            />
            <label
              htmlFor="export-pdf"
              className="cursor-pointer text-sm font-medium select-none"
            >
              PDF (.pdf)
            </label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button
            onClick={() => {
              if (type === "Excel") {
                funcExportToExcel(dataForExport)
              } else if (type === "CSV") {
                funcExportToCsv(dataForExport)
              } else if (type === "PDF") {
                funcExportToPdf(dataForExport)
              }
              setOpen(false)
            }}
          >
            Download {type}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
