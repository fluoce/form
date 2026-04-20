import { formFieldUrlPath } from "@/const/url-path";
import { useTanstack } from "@/hooks/use-tanstack";
import { CommonFormFieldType } from "@/types/formfield";
import {
  FormFieldResponse,
  FormFieldsResponse,
  ResponseType,
} from "@/types/response";

export async function getFormFieldQuery({
  formFieldId,
  formId,
  formPageId,
}: CommonFormFieldType) {
  return (await useTanstack({
    url: formFieldUrlPath.query(formId, formPageId, formFieldId),
    method: "GET",
  })) as ResponseType<FormFieldResponse>;
}

export async function getFormFieldsQuery({
  formId,
  formPageId,
}: Omit<CommonFormFieldType, "formFieldId">) {
  return (await useTanstack({
    url: formFieldUrlPath.queryAll(formId, formPageId),
    method: "GET",
  })) as ResponseType<FormFieldsResponse>;
}
