"use client";

import ErrorMessage from "@/components/shared/ErrorMessage";
import { Header } from "@/components/shared/Header";
import { PageSpinner } from "@/components/shared/Loader";
import NoData from "@/components/shared/NoData";
import Wrapper from "@/components/shared/Wrapper";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { workspaceRoutes } from "@/const/route-const";
import useWorkspace from "@/hooks/use-workspace";
import { RefreshCcw, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TrashWorkspaces() {
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  const { trashWorkspaces, updateWorkspace, deleteWorkspace } = useWorkspace();

  const { data, isLoading, isError, error } = trashWorkspaces;

  const {
    mutateAsync: uMutateAsync,
    isPending: uIsPending,
    isError: uIsError,
    error: uError,
  } = updateWorkspace;

  const {
    mutateAsync: dMutateAsync,
    isPending: dIsPending,
    isError: dIsError,
    error: dError,
  } = deleteWorkspace;

  const trashWorkspacesData = data?.data?.workspaces;

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <Wrapper>
      <div className="flex flex-col gap-6">
        <div className="border-b pb-2">
          <Header
            icon={<Trash />}
            title="Trashed Workspaces"
            type="Restore or Permanently Delete"
          />
          {isError && (
            <ErrorMessage
              error={error?.message || "Failed to get trash workspace"}
            />
          )}
        </div>

        {trashWorkspacesData && trashWorkspacesData.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {trashWorkspacesData?.map((w) => (
              <div
                className="bg-muted flex items-center justify-between gap-2 rounded-xl p-4"
                key={w?.id}
              >
                <span className="line-clamp-1">{w.name}</span>
                <div className="flex items-center gap-1">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary"
                        size="icon-sm"
                      >
                        <RefreshCcw />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Restore Workspace </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will restore this workspace and all of its
                          data. Are you sure you want to proceed with restoring
                          this workspace?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      {uIsError && (
                        <ErrorMessage
                          error={
                            uError?.message || "Failed to restore workspace"
                          }
                        />
                      )}
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          disabled={uIsPending || dIsPending}
                          onClick={async () =>
                            await uMutateAsync({
                              workspaceId: w.id,
                              status: "ACTIVE",
                            })
                          }
                        >
                          {uIsPending && <Spinner />} Restore
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-red-500"
                        size="icon-sm"
                      >
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Workspace </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will permanently delete this workspace and
                          all of its data. This cannot be undone. Are you sure
                          you want to proceed?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      {dIsError && (
                        <ErrorMessage
                          error={
                            dError?.message || "Failed to delete workspace"
                          }
                        />
                      )}
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          onClick={async () =>
                            await dMutateAsync({ workspaceId: w.id })
                          }
                          disabled={uIsPending || dIsPending}
                          variant="destructive"
                        >
                          {dIsPending && <Spinner />} Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoData
            icon={<Trash />}
            title="No Trash Workspaces"
            description="You have no deleted workspaces. Workspaces moved to trash will appear here."
            actions={
              <Link href={workspaceRoutes.dash(workspaceId)}>
                <Button>Go Home</Button>
              </Link>
            }
          />
        )}
      </div>
    </Wrapper>
  );
}
