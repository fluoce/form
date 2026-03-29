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
import useForm from "@/hooks/use-form";
import { RefreshCcw, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TrashForms() {
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  const { trashForm, updateForm, deleteForm } = useForm();

  const { data, isLoading, isError, error } = trashForm;

  const {
    mutateAsync: uMutateAsync,
    isPending: uIsPending,
    isError: uIsError,
    error: uError,
  } = updateForm;

  const {
    mutateAsync: dMutateAsync,
    isPending: dIsPending,
    isError: dIsError,
    error: dError,
  } = deleteForm;

  const trashFormsData = data?.data?.forms;

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <Wrapper>
      <div className="flex flex-col gap-6">
        <div className="border-b pb-2">
          <Header
            icon={<Trash />}
            title="Trashed Forms"
            type="Restore or Permanently Delete"
          />
          {isError && (
            <ErrorMessage
              error={error?.message || "Failed to get trash workspace"}
            />
          )}
        </div>

        {trashFormsData && trashFormsData.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {trashFormsData?.map((f) => (
              <div
                className="bg-muted flex items-center justify-between gap-2 rounded-xl p-4"
                key={f?.id}
              >
                <span className="line-clamp-1">{f?.name}</span>
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
                        <AlertDialogTitle>Restore Form </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will restore this form and all of its
                          data. Are you sure you want to proceed with restoring
                          this form?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      {uIsError && (
                        <ErrorMessage
                          error={uError?.message || "Failed to restore form"}
                        />
                      )}
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          disabled={uIsPending || dIsPending}
                          onClick={async () =>
                            await uMutateAsync({
                              workspaceId: f?.workspaceId,
                              formId: f?.id,
                              status: "DRAFT",
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
                        <AlertDialogTitle>Delete Form </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will permanently delete this form and all
                          of its data. This cannot be undone. Are you sure you
                          want to proceed?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      {dIsError && (
                        <ErrorMessage
                          error={dError?.message || "Failed to delete form"}
                        />
                      )}
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          onClick={async () =>
                            await dMutateAsync({
                              workspaceId: f?.workspaceId,
                              formId: f?.id,
                            })
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
            title="No Trash Form"
            description="You have no deleted Form. Workspaces moved to trash will appear here."
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
