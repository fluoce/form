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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { workspaceRoutes } from "@/const/route-const";
import useWorkspace from "@/hooks/use-workspace";
import { useAppSelector } from "@/providers/redux/redux-provider";
import { WorkspaceStatus } from "@/types/slice";
import { Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkspaceGeneral() {
  const params = useParams<{ workspaceId: string }>();

  const router = useRouter();

  const [name, setName] = useState("");

  const [status, setStatus] = useState<WorkspaceStatus | "">("");

  const id = params?.workspaceId;

  const { workspaces, updateWorkspace } = useWorkspace();

  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading, isError, isFetching, error: e } = workspaces;

  const workspaceList = data?.data?.workspaces ?? [];

  const selectedWorkspace = workspaceList.find((w) => w.id === id);

  if (!selectedWorkspace || isError) {
    return (
      <NoData
        title={`Workspace not found`}
        description="We couldn't find this workspace. It may have been deleted, or you may not have access. If you believe this is an error, please contact support."
      />
    );
  }

  const {
    mutateAsync,
    isPending,
    error,
    isError: isUpdateError,
  } = updateWorkspace;

  const handleWorkspaceUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    forDelete?: boolean,
  ) => {
    e.preventDefault();
    if (forDelete) {
      await mutateAsync({
        workspaceId: selectedWorkspace.id,
        status: "DELETED",
      }).then(() => router.replace(workspaceRoutes.create));
    } else {
      if (user?.id !== selectedWorkspace.ownerId) return;
      const hasNameChanged =
        name && name.trim().length >= 2 && name !== selectedWorkspace.name;
      const hasStatusChanged = status && status !== selectedWorkspace.status;
      if (!hasNameChanged && !hasStatusChanged) {
        return;
      }
      await mutateAsync({
        workspaceId: selectedWorkspace.id,
        name: hasNameChanged ? name : undefined,
        status: hasStatusChanged ? status : undefined,
      });
    }
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <Wrapper>
      <div className="flex w-full max-w-[600px] flex-col items-start justify-start gap-6">
        <Header title="workspace" icon={<Settings />} type="General Settings" />
        <form
          onSubmit={handleWorkspaceUpdate}
          className="flex w-full flex-col gap-8"
        >
          <FieldGroup>
            <FieldSet className="flex flex-col gap-8">
              <FieldLegend>General Workspace Information</FieldLegend>
              <FieldDescription>
                Edit your workspace's basic settings, such as its name or
                status. You can also delete the workspace if it's no longer
                needed.
              </FieldDescription>
              <FieldGroup className="max-w-100">
                <Field>
                  <FieldLabel>Workspace Name</FieldLabel>
                  <Input
                    disabled={isPending || isFetching}
                    value={name ?? selectedWorkspace.name}
                    onChange={(e) => setName(e.target.value)}
                    id="create-workspace"
                    placeholder={
                      selectedWorkspace.name
                        ? selectedWorkspace.name
                        : "Enter New workspace name..."
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel>Status Of Workspace</FieldLabel>
                  <Select
                    value={status}
                    onValueChange={(value) =>
                      setStatus(value as WorkspaceStatus)
                    }
                  >
                    <SelectTrigger disabled={isPending || isFetching}>
                      <SelectValue
                        placeholder={
                          selectedWorkspace.status
                            ? selectedWorkspace.status
                            : "Select New workspace Status"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Button
              className="w-fit"
              type="submit"
              disabled={isPending || isFetching}
            >
              Save
            </Button>
            {isUpdateError && <ErrorMessage error={error?.message || ""} />}
          </FieldGroup>
          <FieldGroup>
            <FieldSet className="flex flex-col gap-8">
              <FieldLegend className="text-red-500">
                Deactivate Workspace
              </FieldLegend>
              <FieldDescription>
                This action will deactivate your workspace. All of your data
                will be preserved, and you can reactivate the workspace later if
                needed from trash section.
              </FieldDescription>
            </FieldSet>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-fit"
                  type="button"
                  disabled={isPending || isFetching}
                  variant="destructive"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Deactivate Workspace</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will deactivate your workspace. All of your data
                    will be preserved, and you can reactivate the workspace
                    later if needed from trash section.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    type="button"
                    disabled={isPending || isFetching}
                    variant="destructive"
                    onClick={(e: any) => handleWorkspaceUpdate(e, true)}
                  >
                    {isPending && <Spinner />} Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </FieldGroup>
        </form>
      </div>
    </Wrapper>
  );
}
