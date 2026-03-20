"use client";

import { CreateWorkspace } from "@/components/shared/CreateWorkspace";
import { BlueSpinner } from "@/components/shared/Loader";
import { workspaceIdKey } from "@/const/localstorage-key";
import { workspaceRoutes } from "@/const/route-const";
import useLocalStorage from "@/hooks/use-localstorage";
import useWorkspace from "@/hooks/use-workspace";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WorkspaceInit() {
  const router = useRouter();

  const { workspaces } = useWorkspace();

  const { data, isLoading } = workspaces;

  const { value: storedWorkspaceId } = useLocalStorage(workspaceIdKey);

  useEffect(() => {
    if (data && data.data?.workspaces && data.data.workspaces.length > 0) {
      const workspaceList = data.data.workspaces;

      const storedWorkspaceInList = workspaceList.find(
        (ws) => ws.id === storedWorkspaceId,
      );

      if (storedWorkspaceId && storedWorkspaceInList) {
        setTimeout(
          () => router.replace(workspaceRoutes.dash(storedWorkspaceId)),
          0,
        );
      } else {
        setTimeout(
          () => router.replace(workspaceRoutes.dash(workspaceList[0].id)),
          0,
        );
      }
    }
  }, [data, storedWorkspaceId]);

  if (isLoading) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center p-4">
        <BlueSpinner />
      </div>
    );
  }

  if (!data?.data?.workspaces || data.data.workspaces.length == 0) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center p-4">
        <CreateWorkspace page={true} />
      </div>
    );
  }

  return null;
}
