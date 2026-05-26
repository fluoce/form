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
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import {
  useFormPageCreate,
  useFormPageDelete,
  useFormPageUpdate,
} from "@/hooks/use-form-page"
import { FormPageCreateType, FormPageType } from "@/types/form-types"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"

export function CreateUpdateFormPage({
  formPage,
  children,
}: {
  formPage?: FormPageType
  children: ReactNode
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormPageCreateType>({
    defaultValues: {
      name: formPage ? formPage?.name : "",
    },
  })

  const [open, setOpen] = useState(false)

  const {
    mutateAsync: deleteFormPage,
    isPending: deleting,
    isError: isDeleteError,
    error: deleteError,
  } = useFormPageDelete()

  const {
    mutateAsync: createFormPage,
    isPending: creating,
    isError: isCreateError,
    error: createError,
  } = useFormPageCreate()

  const { mutateAsync: updateFormPage, isPending: updating } =
    useFormPageUpdate()

  function submit(data: FormPageCreateType) {
    formPage
      ? updateFormPage({
          body: data,
          formPageId: formPage?.id,
        }).then(() => {
          setOpen(false)
          reset()
        })
      : createFormPage({
          body: data,
        }).then(() => {
          setOpen(false)
          reset()
        })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formPage ? "Update Form page" : "Add Form Page"}
          </DialogTitle>
          <DialogDescription>
            {formPage
              ? "Enter New name for this form page."
              : "Enter name for this form page"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submit)}>
          <Field className="mb-4">
            <FieldLabel htmlFor="form-page-name">Page Name</FieldLabel>
            <Input
              id="form-page-name"
              placeholder="name . . ."
              {...register("name", { required: "Form page name is required" })}
            />
          </Field>
          {isCreateError && <ErrorAlert error={createError?.message} />}
          {errors?.name && <ErrorAlert error={errors?.name?.message!} />}
          <DialogFooter className="mt-4">
            <div className="flex w-full items-center justify-between gap-2">
              {formPage ? (
                <Button
                  onClick={() =>
                    deleteFormPage({ formPageId: formPage?.id! }).then(() =>
                      setOpen(false)
                    )
                  }
                  type="button"
                  variant="destructive"
                  disabled={updating || creating || deleting}
                >
                  {deleting && <Spinner />} Delete
                </Button>
              ) : null}
              <div className="flex flex-1 items-center justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button disabled={updating || creating || deleting}>
                  {updating || (creating && <Spinner />)}
                  {formPage ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
