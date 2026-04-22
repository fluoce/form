import { queryKeys } from "@/const/query-key"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useFetch } from "./use-fetch"
import { urls } from "@/const/urls"
import { ResType } from "@/types/res-types"
import {
  WorkspaceCreateType,
  WorkspaceType,
  WorkspaceUpdateType,
} from "@/types/workspace-types"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { routes } from "@/const/routes"

export function useWorkspaces() {
  return useQuery({
    queryKey: queryKeys.workspace.all,
    queryFn: () =>
      useFetch({
        url: urls.workspace.base,
        method: "GET",
      }) as Promise<
        ResType<{
          workspaces: WorkspaceType[]
        }>
      >,
  })
}

export function useWorkspace() {
  const { workspaceId } = useParams<{
    workspaceId: string
  }>()

  return useQuery({
    queryKey: queryKeys.workspace.byId({ workspaceId }),
    queryFn: () =>
      useFetch({
        url: urls.workspace.byId({ workspaceId }),
        method: "GET",
      }) as Promise<
        ResType<{
          workspace: WorkspaceType
        }>
      >,
    enabled: Boolean(workspaceId),
  })
}

export function useWorkspaceTrash() {
  return useQuery({
    queryKey: queryKeys.workspace.trash,
    queryFn: () =>
      useFetch({
        url: urls.workspace.trash,
        method: "GET",
      }) as Promise<
        ResType<{
          workspaces: WorkspaceType[]
        }>
      >,
  })
}

export function useWorkspaceCreate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: WorkspaceCreateType) =>
      useFetch({
        url: urls.workspace.base,
        method: "POST",
        body,
      }) as Promise<
        ResType<{
          workspace: WorkspaceType
        }>
      >,
    onSuccess: (data) => {
      if (!data?.data?.workspace) return
      queryClient.setQueryData<ResType<{ workspaces: WorkspaceType[] }>>(
        queryKeys.workspace.all,
        (previousWorkspaces) => {
          if (!previousWorkspaces || !data?.data?.workspace) {
            return previousWorkspaces
          }
          return {
            ...previousWorkspaces,
            data: {
              ...previousWorkspaces?.data,
              workspaces: [
                ...(previousWorkspaces.data?.workspaces ?? []),
                data?.data?.workspace,
              ] as WorkspaceType[],
            },
          }
        }
      )
    },
  })
}

export function useWorkspaceUpdate() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ body, id }: { body: WorkspaceUpdateType; id: string }) =>
      useFetch({
        url: urls.workspace.byId({ workspaceId: id }),
        method: "PATCH",
        body,
      }) as Promise<
        ResType<{
          workspace: WorkspaceType
        }>
      >,
    onSuccess: (data, variables) => {
      if (!data?.data?.workspace) return
      if (data?.data?.workspace?.status === "ARCHIVED") {
        queryClient.setQueryData<ResType<{ workspaces: WorkspaceType[] }>>(
          queryKeys.workspace.all,
          (previousWorkspaces) => {
            if (!previousWorkspaces || !data?.data?.workspace) {
              return previousWorkspaces
            }
            const updatedWorkspaces =
              previousWorkspaces?.data?.workspaces.filter(
                (w) => w.id !== data?.data?.workspace?.id
              )
            return {
              ...previousWorkspaces,
              data: {
                ...previousWorkspaces?.data,
                workspaces: updatedWorkspaces!,
              },
            }
          }
        )
        queryClient.setQueryData<ResType<{ workspaces: WorkspaceType[] }>>(
          queryKeys.workspace.trash,
          (previousTrashWorkspaces) => {
            if (!previousTrashWorkspaces || !data?.data?.workspace) {
              return previousTrashWorkspaces
            }
            return {
              ...previousTrashWorkspaces,
              data: {
                ...previousTrashWorkspaces?.data,
                workspaces: [
                  ...(previousTrashWorkspaces?.data?.workspaces ?? []),
                  data?.data?.workspace,
                ],
              },
            }
          }
        )
        router.push(routes.dashboard.base)
      } else {
        queryClient.setQueryData<ResType<{ workspaces: WorkspaceType[] }>>(
          queryKeys.workspace.all,
          (previousWorkspaces) => {
            if (!previousWorkspaces || !data?.data?.workspace) {
              return previousWorkspaces
            }
            let updatedWorkspaces
            const exists = previousWorkspaces?.data?.workspaces?.some(
              (w) => w.id === data?.data?.workspace?.id
            )
            if (exists) {
              updatedWorkspaces = previousWorkspaces?.data?.workspaces.map(
                (w) =>
                  w.id === data?.data?.workspace?.id ? data?.data?.workspace : w
              )
            } else {
              updatedWorkspaces = [
                ...(previousWorkspaces?.data?.workspaces ?? []),
                data?.data?.workspace,
              ]
            }
            return {
              ...previousWorkspaces,
              data: {
                ...previousWorkspaces?.data,
                workspaces: updatedWorkspaces!,
              },
            }
          }
        )
        queryClient.setQueryData<ResType<{ workspaces: WorkspaceType[] }>>(
          queryKeys.workspace.trash,
          (previousTrashWorkspaces) => {
            if (!previousTrashWorkspaces || !data?.data?.workspace) {
              return previousTrashWorkspaces
            }
            const updatedTrashWorkspaces =
              previousTrashWorkspaces?.data?.workspaces?.filter(
                (w) => w?.id !== variables?.id
              )
            return {
              ...previousTrashWorkspaces,
              data: {
                ...previousTrashWorkspaces?.data,
                workspaces: updatedTrashWorkspaces!,
              },
            }
          }
        )
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Unable to update workspace")
    },
  })
}

export function useWorkspaceDelete() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ workspaceId }: { workspaceId: string }) =>
      useFetch({
        url: urls.workspace.byId({ workspaceId }),
        method: "DELETE",
      }) as Promise<
        ResType<{
          workspace: WorkspaceType
        }>
      >,
    onSuccess: (data, variables) => {
      if (!data?.data) return
      queryClient.setQueryData<
        ResType<{
          workspaces: WorkspaceType[]
        }>
      >(queryKeys.workspace.trash, (previousTrashWorkspace) => {
        if (!previousTrashWorkspace || !data?.data) {
          return previousTrashWorkspace
        }
        const updatedTrashWorkspaces =
          previousTrashWorkspace?.data?.workspaces.filter(
            (w) => w.id !== variables?.workspaceId
          )
        return {
          ...previousTrashWorkspace,
          data: {
            ...previousTrashWorkspace.data,
            workspaces: updatedTrashWorkspaces!,
          },
        }
      })
    },
    onError: (error) => {
      toast.error(error?.message || "Unable to delete workspace")
    },
  })
}
