import {
  createFormFieldMutation,
  deleteFormFieldMutation,
  updateFormFieldMutation,
} from "@/actions/mutation/form/form-field-mutation";
import {
  getFormFieldQuery,
  getFormFieldsQuery,
} from "@/actions/query/form/form-field-query";
import { formFieldQueryKey } from "@/const/query-keys";
import {
  CommonFormFieldType,
  CreateFormFieldType,
  UpdateFormFieldType,
} from "@/types/formfield";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useFormField() {
  const formFields = (formId: string, formPageId: string) =>
    useQuery({
      queryKey: formFieldQueryKey.formFields(formId, formPageId),
      queryFn: () =>
        getFormFieldsQuery({
          formId,
          formPageId,
        }),
      enabled: Boolean(formId && formPageId),
    });

  const formField = (formId: string, formPageId: string, formFieldId: string) =>
    useQuery({
      queryKey: formFieldQueryKey.formField(formId, formPageId, formFieldId),
      queryFn: () =>
        getFormFieldQuery({
          formId,
          formPageId,
          formFieldId,
        }),
      enabled: Boolean(formId && formPageId && formFieldId),
    });

  const createFormField = useMutation({
    mutationFn: (data: CreateFormFieldType) => createFormFieldMutation(data),
    onError: (error) => {
      toast.error(error?.message || "Failed to create field !");
    },
  });

  const updateFormField = useMutation({
    mutationFn: (data: UpdateFormFieldType) => updateFormFieldMutation(data),
    onError: (error) => {
      toast.error(error?.message || "Failed to update field !");
    },
  });

  const deleteFormField = useMutation({
    mutationFn: (data: CommonFormFieldType) => deleteFormFieldMutation(data),
    onError: (error) => {
      toast.error(error?.message || "failed to delete field !");
    },
  });

  return {
    formFields,
    formField,
    createFormField,
    updateFormField,
    deleteFormField,
  };
}
