"use client"

import { ErrorAlert } from "@/components/shared/error-alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useFormUpdate } from "@/hooks/use-form"
import { FormType, FormUpdateType } from "@/types/form-types"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"

export function UpdateFormTitleDescription({
  form,
  children,
}: {
  form: FormType
  children: ReactNode
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormUpdateType>({
    defaultValues: {
      title: form?.title ?? "",
      description: form?.description ?? "",
    },
  })

  const [open, setOpen] = useState(false)

  const { mutateAsync, isPending } = useFormUpdate()

  function submit(data: FormUpdateType) {
    mutateAsync({
      body: data,
      id: form?.id,
    }).then(() => {
      setOpen(false)
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        reset()
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Title & Description.</DialogTitle>
          <DialogDescription>
            Update form title or description
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submit)}>
          <FieldGroup>
            {" "}
            <Field>
              <FieldLabel htmlFor="form-title">Form Title</FieldLabel>
              <Input
                id="form-title"
                type="text"
                placeholder="Title . . ."
                {...register("title", {
                  required: "Title is required.",
                })}
              />
            </Field>
            {errors?.title && <ErrorAlert error={errors?.title?.message!} />}
            <Field>
              <FieldLabel htmlFor="form-description">
                Form Description
              </FieldLabel>
              <Textarea
                id="form-description"
                placeholder="Description . . ."
                className="scrollbar-hide max-h-24"
                {...register("description")}
              />
            </Field>
            {errors?.description && (
              <ErrorAlert error={errors?.description?.message!} />
            )}
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button disabled={isPending}>
              {isPending && <Spinner />}Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
