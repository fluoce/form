import { workspaceRoutes } from "@/const/route-const";
import { formUrlPath } from "@/const/url-path";
import { useTanstack } from "@/hooks/use-tanstack";
import { FormResponse, FormsResponse, ResponseType } from "@/types/response";

export async function getFormsQuery({ workspaceId }: { workspaceId: string }) {
  return (await useTanstack({
    url: formUrlPath.queryAll(workspaceId),
    method: "GET",
    path: workspaceRoutes.allForm(workspaceId),
  })) as ResponseType<FormsResponse>;
}

export async function getFormQuery({
  formId,
  workspaceId,
}: {
  formId: string;
  workspaceId: string;
}) {
  return (await useTanstack({
    url: formUrlPath.query(formId),
    method: "GET",
    path: workspaceRoutes.allForm(workspaceId),
  })) as ResponseType<FormResponse>;
}

export async function getTrashFormsQuery({
  workspaceId,
}: {
  workspaceId: string;
}) {
  return (await useTanstack({
    url: formUrlPath.queryTrash(workspaceId),
    method: "GET",
    path: workspaceRoutes.allForm(workspaceId),
  })) as ResponseType<FormsResponse>;
}
