"use client"

import { PageSpinner } from "@/components/shared/loader-r"
import { PageHeader } from "@/components/shared/page-header"
import { Wrapper } from "@/components/shared/wrapper-r"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { useWorkspaces } from "@/hooks/use-workspace"
import { EllipsisVertical, Palette, Pencil, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { routes } from "@/const/routes"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useForms, useFormUpdate } from "@/hooks/use-form"
import { formThemes } from "@/const"
import { CreateUpdateForm } from "@/components/form/create-update-form"
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
import { Spinner } from "@/components/ui/spinner"
import { useSidebar } from "@/components/ui/sidebar"

const AllForms = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>()

  const { setOpen } = useSidebar()

  const { data, isLoading } = useWorkspaces()

  const { data: formData, isLoading: formIsLoading } = useForms()

  const { mutateAsync, isPending } = useFormUpdate()

  const selectedWorkspace = data?.data?.workspaces.find(
    (w) => w.id == workspaceId
  )

  if (isLoading || formIsLoading) {
    return <PageSpinner />
  }

  return (
    <Wrapper>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <PageHeader
            title={`${selectedWorkspace?.name}'s Forms`}
            description={` All forms for the workspace "${selectedWorkspace?.name}".`}
          >
            <CreateUpdateForm>
              <Button variant="secondary">
                <Plus /> Form
              </Button>
            </CreateUpdateForm>
          </PageHeader>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {formData?.data?.forms.length
              ? formData?.data?.forms?.map((f) => (
                  <Link
                    href={routes.form.byId({
                      workspaceId: f?.workspaceId,
                      formId: f?.id,
                    })}
                    key={f?.id}
                    className={cn(
                      f?.theme,
                      "flex cursor-pointer flex-col gap-2 rounded-xl border p-4",
                      "bg-primary text-primary-foreground hover:opacity-80"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="line-clamp-1"> {f?.name}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                            }}
                            size="icon-sm"
                            variant="ghost"
                            tabIndex={-1}
                            type="button"
                            aria-label="Workspace options"
                          >
                            <EllipsisVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-60"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                        >
                          <DropdownMenuGroup className="flex flex-col gap-1">
                            <DropdownMenuLabel className="truncate pt-2">
                              {f?.name}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <CreateUpdateForm form={f}>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault()
                                }}
                              >
                                <Pencil /> Rename
                              </DropdownMenuItem>
                            </CreateUpdateForm>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Palette />
                                Form Theme
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent className="grid grid-cols-2">
                                {formThemes?.map((t) => (
                                  <DropdownMenuItem
                                    key={t}
                                    onSelect={() => {
                                      mutateAsync({
                                        body: {
                                          theme: t,
                                        },
                                        id: f?.id,
                                      })
                                    }}
                                  >
                                    <span
                                      className={cn(
                                        "h-4 w-4 rounded-xl border bg-primary",
                                        t
                                      )}
                                    ></span>
                                    {t}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  variant="destructive"
                                  onSelect={(e) => {
                                    e.preventDefault()
                                  }}
                                >
                                  <Trash2 /> Move to Trash
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Trash Form {f?.name}
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to move the form{" "}
                                    <b>{f?.name}</b> to Trash ?
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
                                        id: f?.id,
                                      })
                                    }
                                    disabled={isPending}
                                  >
                                    {isPending && <Spinner />} Trash
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default AllForms
