import { formRoutes, workspaceRoutes } from "@/const/route-const";
import { formUrlPath } from "@/const/url-path";
import { useTanstack } from "@/hooks/use-tanstack";
import { FormResponse, ResponseType } from "@/types/response";
import { formUpdateInputType } from "@/types/type";

export async function createFormMutation({
    name,
    workspaceId
}: { name: string, workspaceId: string }) {
    return await useTanstack({
        url: formUrlPath.createMutation(workspaceId),
        method: 'POST',
        body: {
            name
        },
        path: workspaceRoutes.allForm(workspaceId)
    }) as ResponseType<FormResponse>
}

export async function updateFormMutation({
    formId,
    status,
    name,
    workspaceId
}: formUpdateInputType) {
    return await useTanstack({
        url: formUrlPath.mutation(formId),
        method: 'PATCH',
        body: {
            name,
            status
        },
        path: formRoutes.setting(workspaceId, formId, "general")
    }) as ResponseType<FormResponse>
}

export async function deleteFormMutation({
    formId,
    workspaceId
}: { formId: string, workspaceId: string }) {
    return await useTanstack({
        url: formUrlPath.mutation(formId),
        method: 'DELETE',
        path: formRoutes.setting(workspaceId, formId, "general")
    }) as ResponseType<FormResponse>
}