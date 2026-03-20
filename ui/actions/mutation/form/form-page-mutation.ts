import { formPageUrlPath } from "@/const/url-path";
import { useTanstack } from "@/hooks/use-tanstack";
import { FormPageResponse, ResponseType } from "@/types/response";

export async function createFormPageMutation({
  formId,
  name,
}: {
  formId: string;
  name?: string;
}) {
  return (await useTanstack({
    url: formPageUrlPath.createMutation(formId),
    method: "POST",
    body: {
      name,
    },
  })) as ResponseType<FormPageResponse>;
}

export async function updateFormPageMutation({
  formId,
  formPageId,
  name,
  position,
}: {
  formId: string;
  formPageId: string;
  name?: string;
  position?: number;
}) {
  return (await useTanstack({
    url: formPageUrlPath.mutation(formId, formPageId),
    method: "PATCH",
    body: {
      name,
      position,
    },
  })) as ResponseType<FormPageResponse>;
}

export async function deleteFormPageMutation({
  formId,
  formPageId,
}: {
  formId: string;
  formPageId: string;
}) {
  return (await useTanstack({
    url: formPageUrlPath.mutation(formId, formPageId),
    method: "DELETE",
  })) as ResponseType<FormPageResponse>;
}
