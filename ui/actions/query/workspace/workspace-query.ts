import { workspaceUrlPath } from "@/const/url-path"
import { ResponseType, WorkspaceResponse, WorkspacesResponse } from "@/types/response";
import { useTanstack } from "@/hooks/use-tanstack";
import { workspaceRoutes } from "@/const/route-const";

export async function getWorkspacesQuery() {
    return await useTanstack({
        url: workspaceUrlPath.base,
        method: "GET",
        path: workspaceRoutes.create
    }) as ResponseType<WorkspacesResponse>;
}

export async function getWorkspaceQuery(workspaceId: string) {
    return await useTanstack({
        url: workspaceUrlPath.query(workspaceId),
        method: "GET",
        path: workspaceRoutes.setting(workspaceId, 'general')
    }) as ResponseType<WorkspaceResponse>;
}

export async function getTrashWorkspacesQuery() {
    return await useTanstack({
        url: workspaceUrlPath.queryTrash,
        method: 'GET',
        path: workspaceRoutes.create // TODO: add better path for workspace trash
    })
}