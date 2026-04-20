"use client"

import { ErrorAlert } from "@/components/shared/error-alert"
import { PageSpinner } from "@/components/shared/loader"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { routes } from "@/const/routes"
import { useWorkspaceCreate, useWorkspaces } from "@/hooks/use-workspace"
import { WorkspaceCreateType } from "@/types/workspace-types"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function CreateWorkspace({
  page = true,
  children,
}: {
  page?: boolean
  children?: ReactNode
}) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkspaceCreateType>()

  const [open, setOpen] = useState(false)

  const { mutateAsync, isPending, isError, error } = useWorkspaceCreate()

  function submit(data: WorkspaceCreateType) {
    mutateAsync(data).then(() => {
      page ? router.replace(routes.dashboard.base) : setOpen(false)
    })
  }

  const Form = () => {
    return (
      <form onSubmit={handleSubmit(submit)} className="w-full max-w-100">
        <Field className="flex flex-col gap-4">
          <div>
            <FieldLabel htmlFor="create-workspace">Create Workspace</FieldLabel>
            <FieldDescription>
              A workspace allows you to organize and manage your forms in one
              place
            </FieldDescription>
          </div>
          <Input
            autoFocus
            className="h-10"
            id="create-workspace"
            placeholder="workspace name . . . "
            {...register("name", {
              required: "workspace name is required.",
            })}
          />
          <Button className="h-10" disabled={isPending}>
            {isPending && <Spinner />} Create
          </Button>
          {errors?.name && <ErrorAlert error={errors?.name?.message!} />}
          {isError && <ErrorAlert error={error?.message} />}
        </Field>
      </form>
    )
  }

  if (page) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Form />
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="h-0">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form />
      </DialogContent>
    </Dialog>
  )
}
