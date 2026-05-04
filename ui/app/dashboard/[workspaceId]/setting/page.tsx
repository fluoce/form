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
import { Kbd } from "@/components/ui/kbd"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { useWorkspace, useWorkspaceUpdate } from "@/hooks/use-workspace"
import { WorkspaceStatusType } from "@/types/workspace-types"
import { Trash2 } from "lucide-react"

const WORKSPACE_STATUS: WorkspaceStatusType[] = ["ACTIVE", "INACTIVE"]

const page = () => {
  const { data, isLoading } = useWorkspace()

  const { mutateAsync, isPending } = useWorkspaceUpdate()

  const workspace = data?.data?.workspace

  if (isLoading) return <PageSpinner />

  if (!data?.data?.workspace) return null

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Workspace"
          description={`Manage settings for your workspace.`}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Avatar className="size-10">
              <AvatarFallback>
                {workspace?.name[0].slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="flex flex-wrap items-center gap-2">
              {workspace?.name} <Kbd>{workspace?.slug}</Kbd>
            </h3>
          </div>
          <div>
            <Span text="Owner" />
            <h3>{workspace?.ownerEmail}</h3>
          </div>
          <div>
            <Span text="Status" />
            <Select
              disabled={isPending}
              defaultValue={workspace?.status}
              onValueChange={(v: WorkspaceStatusType) =>
                mutateAsync({
                  body: {
                    status: v,
                  },
                  id: workspace?.id!,
                })
              }
            >
              <SelectTrigger
                disabled={isPending}
                className="cursor-pointer text-base"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WORKSPACE_STATUS?.map((s) => (
                  <SelectItem value={s} key={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Span text="Plan" />
            <h3>{workspace?.plan}</h3>
            <Button className="mt-2" variant="secondary">
              Upgrade
            </Button>
          </div>
        </div>
        <div>
          <h3 className="mb-1 text-lg font-semibold text-destructive">
            Move Workspace to Trash
          </h3>
          <p className="mb-2 max-w-80 text-xs text-muted-foreground">
            Trashing this workspace will move{" "}
            <b>all forms, responses, and members</b> associated with it into the
            trash. You can restore everything later from the trash, or
            permanently delete the workspace and its data at your discretion.
            <br />
            <span className="font-medium text-destructive">Note:</span> This
            action is reversible until you permanently delete the workspace.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mt-2">
                <Trash2 /> Trash
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Move Workspace "{workspace?.name}" to Trash?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to move this workspace to the trash? All
                  forms, responses, and members associated with it will also be
                  moved. You can restore the workspace from the trash or choose
                  to permanently delete it at a later time.
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
                      id: workspace?.id!,
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

export default page

function Span({ text }: { text: string }) {
  if (!text) return null
  return <span className="text-sm text-muted-foreground">{text}</span>
}
