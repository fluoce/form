"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useWorkspaces } from "@/hooks/use-workspace"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import CreateWorkspace from "@/app/dashboard/create-workspace/page"
import { routes } from "@/const/routes"

export function SelectWorkspace() {
  const router = useRouter()

  const { workspaceId } = useParams<{
    workspaceId: string
  }>()

  const { data } = useWorkspaces()

  const selectedWorkspace = data?.data?.workspaces.find(
    (w) => w.id == workspaceId
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-1 items-center justify-between"
        >
          <span className="line-clamp-1"> {selectedWorkspace?.name}</span>{" "}
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className="flex flex-col gap-1">
          <DropdownMenuLabel> Workspaces</DropdownMenuLabel>
          {data?.data?.workspaces?.map((w) => (
            <DropdownMenuItem
              onSelect={() => {
                router.replace(
                  routes.dashboard.workspace({ workspaceId: w?.id })
                )
              }}
              key={w?.id}
              className={cn(
                "flex items-center justify-between",
                w?.id == selectedWorkspace?.id &&
                  "bg-secondary text-secondary-foreground"
              )}
            >
              {w?.name}
              {w?.id == selectedWorkspace?.id && <Check />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <CreateWorkspace page={false}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Plus /> Create workspace
            </DropdownMenuItem>
          </CreateWorkspace>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
