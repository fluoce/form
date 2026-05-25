import { Button } from "@/components/ui/button"
import { FormPageType } from "@/types/form-types"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { Fields } from "./fields"
import { ErrorAlert } from "@/components/shared/error-alert"
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
import { formSubmissionKey } from "../const/localstorage-key"
import { COUNTRY } from "@/components/form/module/data/country"
import { format } from "date-fns"
import { ClearBtn } from "@/components/form/clear-btn"
import { PrevBtn } from "@/components/form/pre-btn"
import { SubmitBtn } from "@/components/form/submit-btn"
import { useSubmitAdd } from "@/hooks/use-submit"

export function FormPages({
  formPages,
  submissionId,
  formId,
  setDone,
}: {
  formPages: FormPageType[]
  submissionId: string
  formId: string
  setDone: Dispatch<SetStateAction<boolean>>
}) {
  const [page, setPage] = useState(0)

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    mode: "onSubmit",
  })

  const currentPage = formPages?.[page]

  const { mutateAsync } = useSubmitAdd()

  const submit = (data: any) => {
    const currentFields = formPages?.[page]?.formField || []
    const answers = Object.fromEntries(
      currentFields.map((field) => {
        if (field?.config?.type == "phone") {
          const countryCode = data[`${field?.id}_country`]
          const countryData = COUNTRY.find((c) => c.value == countryCode)
          if (countryCode && countryData) {
            return [
              field?.id,
              `${countryData?.value} ${countryData?.numberPrefix} ${data[field?.id]}`,
            ]
          }
        }
        if (field?.config?.type == "date") {
          if (!data[field?.id]) return [field.id, ""]
          const formatedDate = format(data[field?.id], "dd-MM-yyyy")
          return [field.id, formatedDate]
        }
        return [field.id, data[field.id]]
      })
    )
    const payload = {
      formId,
      submissionId,
      pageId: formPages?.[page]?.id,
      answers,
    }
    const isLastPage = page === formPages?.length - 1
    mutateAsync({
      body: {
        ...payload,
        ...(isLastPage ? { done: true } : {}),
      },
    })
    if (!isLastPage) {
      setPage((prev) => prev + 1)
      return
    }
    setDone(true)
    localStorage.removeItem(formSubmissionKey(formId))
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-8">
      {currentPage?.formField?.map((f) => (
        <div
          key={f?.id}
          className="flex flex-col gap-4 rounded-lg border bg-primary/10 p-6"
        >
          <Fields
            name={f?.config?.label || f?.id || "field"}
            id={f?.id}
            control={control}
            field={f}
            register={register}
            setValue={setValue}
          />
          {errors?.[f?.id]?.message ? (
            <ErrorAlert error={String(errors?.[f?.id]?.message)} />
          ) : null}
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
                  reset()
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
    </form>
  )
}
