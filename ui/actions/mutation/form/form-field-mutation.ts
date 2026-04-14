import { formFieldUrlPath } from "@/const/url-path";
import { useTanstack } from "@/hooks/use-tanstack";
import {
  CreateFormFieldType,
  CommonFormFieldType,
  UpdateFormFieldType,
} from "@/types/formfield";
import { FormFieldResponse, ResponseType } from "@/types/response";

export async function createFormFieldMutation({
  body,
  formId,
  formPageId,
}: CreateFormFieldType) {
  return (await useTanstack({
    url: formFieldUrlPath.createMutation(formId, formPageId),
    method: "POST",
    body,
  })) as ResponseType<FormFieldResponse>;
}

export async function updateFormFieldMutation({
  body,
  formFieldId,
  formId,
  formPageId,
}: UpdateFormFieldType) {
  return (await useTanstack({
    url: formFieldUrlPath.mutation(formId, formPageId, formFieldId),
    method: "PUT",
    body,
  })) as ResponseType<FormFieldResponse>;
}

export async function deleteFormFieldMutation({
  formFieldId,
  formId,
  formPageId,
}: CommonFormFieldType) {
  return (await useTanstack({
    url: formFieldUrlPath.mutation(formId, formPageId, formFieldId),
    method: "DELETE",
  })) as ResponseType<FormFieldResponse>;
}
