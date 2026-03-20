"use client";

import { ChevronsUpDown, CreditCard, Settings, Square } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import useWorkspace from "@/hooks/use-workspace";
import { PlanBadge } from "./PlanBadge";
import { useAppSelector } from "@/providers/redux/redux-provider";
import { Skeleton } from "../ui/skeleton";
import { useSyncSelectedWorkspace } from "@/hooks/use-sync-selected-workspace";
import { CreateWorkspace } from "./CreateWorkspace";
import Link from "next/link";
import { workspaceRoutes } from "@/const/route-const";
import { redirect } from "next/navigation";

const SelectWorkspace = () => {
  const { workspaces } = useWorkspace();

  const { data, isLoading } = workspaces;

  const { selectedWorkspaceId } = useAppSelector((state) => state.workspace);

  const workspaceList = data?.data?.workspaces ?? [];

  const selectedWorkspace = workspaceList.find(
    (w) => w.id === selectedWorkspaceId,
  );

  useSyncSelectedWorkspace(workspaceList);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : !workspaceList || workspaceList.length == 0 ? (
          redirect(workspaceRoutes.create)
        ) : (
          <Button
            variant="secondary"
            className="w-full items-center justify-between gap-2"
          >
            <span className="min-w-0 truncate text-left">
              {selectedWorkspace?.name ?? "Select Workspace"}
            </span>
            <ChevronsUpDown className="shrink-0 opacity-50" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="custom-scroll w-80 max-w-screen">
        {selectedWorkspace && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground flex justify-between gap-2 text-sm">
                {selectedWorkspace.name}
                <PlanBadge plan={selectedWorkspace.plan} />
              </DropdownMenuLabel>
              <div className="flex w-full items-center gap-1 px-1">
                {/* <Link href={workspaceRoutes.setting(selectedWorkspace.id, 'billing')}>
                                    <Button
                                        variant='secondary'
                                        size='sm'
                                        className="text-muted-foreground"
                                    >
                                        <CreditCard />
                                        Billing
                                    </Button>
                                </Link> */}
                <Link
                  href={workspaceRoutes.setting(
                    selectedWorkspace.id,
                    "general",
                  )}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-muted-foreground"
                  >
                    <Settings />
                    Settings
                  </Button>
                </Link>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup className="flex flex-col gap-1">
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          {workspaceList
            ?.filter((workspace) => workspace.id !== selectedWorkspaceId)
            ?.map((w) => (
              <Link key={w.id} href={workspaceRoutes.dash(w.id)}>
                <DropdownMenuItem
                  className={selectedWorkspaceId === w.id ? "bg-accent" : ""}
                >
                  <Square className="text-primary" />
                  {w.name}
                  <DropdownMenuShortcut>
                    <PlanBadge plan={w.plan} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            ))}
          <CreateWorkspace
            className="mt-2 h-7.5 w-full"
            variant="secondary"
            text="Workspace"
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectWorkspace;
