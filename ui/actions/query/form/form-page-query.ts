import { formPageUrlPath } from "@/const/url-path";
import { useTanstack } from "@/hooks/use-tanstack";
import {
  FormPageResponse,
  FormPagesResponse,
  ResponseType,
} from "@/types/response";

export async function getFormPagesQuery({ formId }: { formId: string }) {
  return (await useTanstack({
    url: formPageUrlPath.queryAll(formId),
    method: "GET",
  })) as ResponseType<FormPagesResponse>;
}

export async function getFormPageQuery({
  formId,
  formPageId,
}: {
  formId: string;
  formPageId: string;
}) {
  return (await useTanstack({
    url: formPageUrlPath.query(formId, formPageId),
    method: "GET",
  })) as ResponseType<FormPageResponse>;
}
