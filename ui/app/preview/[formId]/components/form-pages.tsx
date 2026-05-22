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
import { ClearBtn } from "@/components/form/clear-btn"
import { PrevBtn } from "@/components/form/pre-btn"
import { SubmitBtn } from "@/components/form/submit-btn"

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
            <ClearBtn />
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
        <PrevBtn
          onClick={() => {
            if (page > 0) {
              setPage((prev) => prev - 1)
            }
          }}
          disabled={page === 0}
        />
        <SubmitBtn>
          {page >= formPages?.length - 1 ? "Submit" : "Next"}
        </SubmitBtn>
      </div>
    </div>
  )
}
