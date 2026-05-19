"use client"

import { PageSpinner } from "@/components/shared/loader-r"
import { PageHeader } from "@/components/shared/page-header"
import { Wrapper } from "@/components/shared/wrapper-r"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Kbd } from "@/components/ui/kbd"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useForm, useFormUpdate } from "@/hooks/use-form"
import { FormStatus } from "@/types/form-types"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

const FORM_STATUS: FormStatus[] = ["ARCHIVED", "DRAFT", "PUBLISHED"]

export function FormGeneral() {
  const { data, isLoading } = useForm()

  const { mutateAsync, isPending } = useFormUpdate()

  const form = data?.data?.form

  if (isLoading) return <PageSpinner />

  if (!data?.data?.form) return null

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Form"
          description={`Manage general settings for your Form.`}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Avatar className={cn("size-10", form?.theme)}>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {form?.name[0].slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="flex flex-wrap items-center gap-2">
              {form?.name} <Kbd>{form?.slug}</Kbd>
            </h3>
          </div>
          <div>
            <Span text="Status" />
            <Select
              disabled={isPending}
              defaultValue={form?.status}
              onValueChange={(v: FormStatus) =>
                mutateAsync({
                  body: {
                    status: v,
                  },
                  id: form?.id!,
                })
              }
            >
              <SelectTrigger className="cursor-pointer text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORM_STATUS?.map((s) => (
                  <SelectItem value={s} key={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <h3 className="mb-1 text-lg font-semibold text-destructive">
            Move Form to Trash
          </h3>
          <p className="mb-2 max-w-80 text-xs text-muted-foreground">
            Trashing this form will move <b>all responses</b> associated with it
            into the trash. You can restore everything later from the trash, or
            permanently delete the form and its data at your discretion.
            <br />
            <span className="font-medium text-destructive">Note:</span> This
            action is reversible until you permanently delete the form.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mt-2">
                {isPending ? <Spinner /> : <Trash2 />} Trash
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Move form "{form?.name}" to Trash?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to move this form to the trash? All
                  responses associated with it will also be moved. You can
                  restore the form from the trash or choose to permanently
                  delete it at a later time.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    mutateAsync({
                      body: {
                        status: "ARCHIVED",
                      },
                      id: form?.id!,
                    })
                  }
                  variant="destructive"
                >
                  {isPending && <Spinner />} Trash
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Wrapper>
  )
}

function Span({ text }: { text: string }) {
  if (!text) return null
  return <span className="text-sm text-muted-foreground">{text}</span>
}
