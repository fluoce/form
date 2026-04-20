import { queryKeys } from "@/const/query-key"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useFetch } from "./use-fetch"
import { urls } from "@/const/urls"
import { ResType } from "@/types/res-types"
import {
  WorkspaceCreateType,
  WorkspaceType,
  WorkspaceUpdateType,
} from "@/types/workspace-types"
import { useParams } from "next/navigation"

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
  })
}

export function useWorkspaceUpdate() {
  return useMutation({
    mutationFn: (body: WorkspaceUpdateType) =>
      useFetch({
        url: urls.workspace.byId({ workspaceId: body.workspaceId }),
        method: "PATCH",
        body,
      }) as Promise<
        ResType<{
          workspace: WorkspaceType
        }>
      >,
  })
}
