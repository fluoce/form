import {
  createWorkspaceMutation,
  deleteWorkspaceMutation,
  updateWorkspaceMutation,
} from "@/actions/mutation/workspace/workspace-mutation";
import {
  getTrashWorkspacesQuery,
  getWorkspaceQuery,
  getWorkspacesQuery,
} from "@/actions/query/workspace/workspace-query";
import { workspaceQueryKey } from "@/const/query-keys";
import { WorkspaceUpdateInputType } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useWorkspace() {
  const queryClient = useQueryClient();

  const createWorkspace = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      createWorkspaceMutation({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKey.workspaces,
      });
    },
  });

  const updateWorkspace = useMutation({
    mutationFn: ({ workspaceId, name, status }: WorkspaceUpdateInputType) =>
      updateWorkspaceMutation({
        workspaceId,
        name,
        status,
      }),
    onSuccess: (_, variables) => {
      const worksapceId = variables.workspaceId;
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKey.workspaces,
      });
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKey.workspace(worksapceId),
      });
    },
  });

  const deleteWorkspace = useMutation({
    mutationFn: ({ workspaceId }: { workspaceId: string }) =>
      deleteWorkspaceMutation({ workspaceId }),
    onSuccess: (_, variables) => {
      const workspaceId = variables.workspaceId;
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKey.workspace(workspaceId),
      });
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKey.trashWorkspaces,
      });
    },
  });

  const workspaces = useQuery({
    queryKey: workspaceQueryKey.workspaces,
    queryFn: getWorkspacesQuery,
  });

  const workspace = (workspaceId: string) =>
    useQuery({
      queryKey: workspaceQueryKey.workspace(workspaceId),
      queryFn: () => getWorkspaceQuery(workspaceId),
    });

  const trashWorkspaces = () =>
    useQuery({
      queryKey: workspaceQueryKey.trashWorkspaces,
      queryFn: () => getTrashWorkspacesQuery(),
    });

  return {
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    workspaces,
    workspace,
    trashWorkspaces,
  };
}
