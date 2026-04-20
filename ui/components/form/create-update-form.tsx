"use client"

import { ReactNode, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { useForm } from "react-hook-form"
import { FormCreateType, FormType } from "@/types/form-types"
import { useFormCreate, useFormUpdate } from "@/hooks/use-form"
import { Field } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { ErrorAlert } from "../shared/error-alert"

export function CreateUpdateForm({
  children,
  form,
}: {
  children: ReactNode
  form?: FormType
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCreateType>({
    defaultValues: {
      name: form ? form?.name : "",
    },
  })

  const [open, setOpen] = useState(false)

  const { mutateAsync, isPending, isError, error } = useFormCreate()

  const {
    mutateAsync: updateForm,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useFormUpdate()

  function submit(data: FormCreateType) {
    form
      ? updateForm({
          body: data,
          id: form.id,
        }).then(() => {
          setOpen(false)
        })
      : mutateAsync(data).then(() => {
          setOpen(false)
        })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{form ? "Update Form" : "Create Form"}</DialogTitle>
          <DialogDescription>
            {form
              ? "Rename this form's name"
              : "Give your form a name. You can edit this later."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(submit)}
          onClick={(e) => e.stopPropagation()}
        >
          <Field className="flex flex-col gap-4">
            <Input
              className="h-10"
              id="create-form"
              placeholder="Form name . . ."
              {...register("name", {
                required: "Form name is required.",
              })}
            />
            <Button className="h-10" disabled={isPending || isUpdating}>
              {(isPending || isUpdating) && <Spinner />}
              {form ? "Update" : "Create"}
            </Button>
            {errors?.name && <ErrorAlert error={errors?.name?.message!} />}
            {isError && (
              <ErrorAlert error={error?.message || "Unable to create form"} />
            )}
            {isUpdateError && (
              <ErrorAlert
                error={updateError?.message || "Unable to update form"}
              />
            )}
          </Field>
        </form>
      </DialogContent>
    </Dialog>
  )
}
