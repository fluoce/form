"use client"

import { PageSpinner } from "@/components/shared/loader"
import { PageHeader } from "@/components/shared/page-header"
import { Wrapper } from "@/components/shared/wrapper-r"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Spinner } from "@/components/ui/spinner"
import { useFormDelete, useFormTrash, useFormUpdate } from "@/hooks/use-form"
import {
  useWorkspaceDelete,
  useWorkspaceTrash,
  useWorkspaceUpdate,
} from "@/hooks/use-workspace"
import { RotateCcw, Trash2 } from "lucide-react"

const page = () => {
  const { data, isLoading } = useWorkspaceTrash()

  const { mutateAsync, isPending } = useWorkspaceUpdate()

  const { mutateAsync: deleteWorkspace, isPending: workspaceDeleteIsPending } =
    useWorkspaceDelete()

  const { data: formTrash, isLoading: formTrashLoading } = useFormTrash()

  const { mutateAsync: formUpdate, isPending: formUpdateIsPending } =
    useFormUpdate()

  const { mutateAsync: deleteForm, isPending: deleteIsPending } =
    useFormDelete()

  if (isLoading || formTrashLoading) return <PageSpinner />

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <PageHeader title="Trash" description="All your trash data." />
        {data?.data?.workspaces.length ? (
          <div className="flex flex-col gap-4">
            <span className="text-sm text-muted-foreground">workspaces</span>
            <div className="flex flex-col gap-2 px-4">
              {data?.data?.workspaces.map((w) => (
                <div key={w?.id} className="flex items-center gap-4">
                  <Avatar className="size-5">
                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                      {w?.name.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1">{w?.name}</span>
                  <ButtonGroup>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="xs" variant="outline">
                          <RotateCcw />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Restore Workspace {w?.name}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to restore the Workspace{" "}
                            <b>{w?.name}</b>?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={isPending}
                            onClick={() =>
                              mutateAsync({
                                body: {
                                  status: "ACTIVE",
                                },
                                id: w?.id,
                              })
                            }
                          >
                            {isPending && <Spinner />} Restore
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="xs"
                          variant="outline"
                          className="text-destructive"
                        >
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete workspace {w?.name}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to permanently delete the
                            Workspace <b>{w?.name}</b>? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={workspaceDeleteIsPending}
                            variant="destructive"
                            onClick={() =>
                              deleteWorkspace({
                                workspaceId: w?.id,
                              })
                            }
                          >
                            {workspaceDeleteIsPending && <Spinner />} Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </ButtonGroup>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {formTrash?.data?.forms.length ? (
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              Forms (selected workspace's forms)
            </span>
            <div className="flex flex-col gap-2 px-4">
              {formTrash?.data?.forms.map((f) => (
                <div key={f?.id} className="flex items-center gap-4">
                  <Avatar className={`${f?.theme} size-5`}>
                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                      {f?.name.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1">{f?.name}</span>
                  <ButtonGroup>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="xs" variant="outline">
                          <RotateCcw />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Restore form {f?.name}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to restore the form{" "}
                            <b>{f?.name}</b>? It will be moved back to your
                            workspace.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={formUpdateIsPending}
                            onClick={() =>
                              formUpdate({
                                body: {
                                  status: "DRAFT",
                                },
                                id: f?.id,
                              })
                            }
                          >
                            {formUpdateIsPending && <Spinner />} Restore
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="xs"
                          variant="outline"
                          className="text-destructive"
                        >
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete form {f?.name}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to permanently delete the form{" "}
                            <b>{f?.name}</b>? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={deleteIsPending}
                            variant="destructive"
                            onClick={() =>
                              deleteForm({
                                formId: f?.id,
                              })
                            }
                          >
                            {deleteIsPending && <Spinner />} Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </ButtonGroup>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Wrapper>
  )
}

export default page
