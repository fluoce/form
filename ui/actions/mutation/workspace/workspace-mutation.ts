import { workspaceRoutes } from "@/const/route-const";
import { workspaceUrlPath } from "@/const/url-path"
import { useTanstack } from "@/hooks/use-tanstack";
import { ResponseType, WorkspaceResponse } from "@/types/response";
import { WorkspaceUpdateInputType } from "@/types/type";

export async function createWorkspaceMutation({
    name
}: { name: string }) {
    return await useTanstack({
        url: workspaceUrlPath.base,
        method: "POST",
        body: {
            name
        },
        path: workspaceRoutes.create
    }) as ResponseType<WorkspaceResponse>;
}

export async function updateWorkspaceMutation({
    workspaceId,
    name,
    status,
}: WorkspaceUpdateInputType) {
    return await useTanstack({
        url: workspaceUrlPath.mutation(workspaceId),
        method: "PATCH",
        body: {
            name,
            status
        },
        path: workspaceRoutes.setting(workspaceId, 'general')
    }) as ResponseType<WorkspaceResponse>
}

export async function deleteWorkspaceMutation({
    workspaceId
}: { workspaceId: string }) {
    return await useTanstack({
        url: workspaceUrlPath.mutation(workspaceId),
        method: 'DELETE',
        path: workspaceRoutes.setting(workspaceId, 'general') // TODO: add better path for workspace trash
    }) as ResponseType<WorkspaceResponse>
}