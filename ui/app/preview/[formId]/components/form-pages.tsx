import { Button } from "@/components/ui/button"
import { FormPageType } from "@/types/form-types"
import { useState } from "react"
import { Fields } from "./fields"
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

export function FormPages({
  formPages,
  formId,
}: {
  formPages: FormPageType[]
  formId: string
}) {
  const [page, setPage] = useState(0)

  const currentPage = formPages?.[page]

  return (
    <div className="flex flex-col gap-8">
      {currentPage?.formField?.map((f) => (
        <div
          key={f?.id}
          className="flex flex-col gap-4 rounded-lg border bg-primary/10 p-6"
        >
          <Fields
            name={f?.config?.label || f?.id || "field"}
            id={f?.id}
            field={f}
          />
        </div>
      ))}
      <div className="grid grid-cols-4 gap-4 pt-1 pb-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" className="p-4" variant="destructive">
              Clear
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear Form</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to clear all form inputs? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => {
                  setPage(0)
                }}
              >
                Clear
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          type="button"
          className="p-4"
          variant="outline"
          onClick={() => {
            if (page > 0) {
              setPage((prev) => prev - 1)
            }
          }}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button type="submit" className="col-span-2 p-4">
          {page >= formPages?.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  )
}
