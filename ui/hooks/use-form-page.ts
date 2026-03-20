import {
  createFormPageMutation,
  deleteFormPageMutation,
  updateFormPageMutation,
} from "@/actions/mutation/form/form-page-mutation";
import {
  getFormPageQuery,
  getFormPagesQuery,
} from "@/actions/query/form/form-page-query";
import { formPageQueryKey } from "@/const/query-keys";
import { FormPagesResponse, ResponseType } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useFormPage() {
  const queryClient = useQueryClient();

  const formPages = (formId: string) =>
    useQuery({
      queryKey: formPageQueryKey.formPages(formId),
      queryFn: () => getFormPagesQuery({ formId }),
      enabled: Boolean(formId),
    });

  const formPage = (formId: string, formPageId: string) =>
    useQuery({
      queryKey: formPageQueryKey.formPage(formId, formPageId),
      queryFn: () =>
        getFormPageQuery({
          formId,
          formPageId,
        }),
      enabled: Boolean(formId) && Boolean(formPageId),
    });

  const createFormPage = useMutation({
    mutationFn: ({ formId, name }: { formId: string; name?: string }) =>
      createFormPageMutation({ formId, name }),
    onSuccess: (data, variables) => {
      const formPage = data?.data?.formPage;
      queryClient.setQueryData(
        formPageQueryKey.formPages(variables.formId),
        (old: ResponseType<FormPagesResponse>) => {
          if (!old || !formPage) return old;
          return {
            ...old,
            data: {
              ...old.data,
              //@ts-ignore
              formPages: [...old?.data?.formPages, formPage],
            },
          };
        },
      );
    },
  });

  const updateFormPage = useMutation({
    mutationFn: ({
      formId,
      formPageId,
      name,
      position,
    }: {
      formId: string;
      formPageId: string;
      name?: string;
      position?: number;
    }) =>
      updateFormPageMutation({
        formId,
        formPageId,
        name,
        position,
      }),
    onSuccess: (data, variables) => {
      const updatedFormPage = data?.data?.formPage;
      queryClient.setQueryData(
        formPageQueryKey.formPages(variables.formId),
        (old: ResponseType<FormPagesResponse>) => {
          if (!old || !updatedFormPage) return old;
          const updatedFormPages =
            old?.data?.formPages?.map((page) =>
              page.id === updatedFormPage.id ? updatedFormPage : page,
            ) || [];
          return {
            ...old,
            data: {
              ...old.data,
              formPages: updatedFormPages,
            },
          };
        },
      );
    },
  });

  const deleteFormPage = useMutation({
    mutationFn: ({
      formId,
      formPageId,
    }: {
      formId: string;
      formPageId: string;
    }) =>
      deleteFormPageMutation({
        formId,
        formPageId,
      }),
    onSuccess: (data, variables) => {
      const deletedFormPage = data?.data?.formPage;
      queryClient.setQueryData(
        formPageQueryKey.formPages(variables.formId),
        (old: ResponseType<FormPagesResponse>) => {
          if (!old || !deletedFormPage) return old;
          const updatedFormPages =
            old?.data?.formPages?.filter(
              (page) => page.id !== deletedFormPage.id,
            ) ?? [];
          return {
            ...old,
            data: {
              ...old.data,
              formPages: updatedFormPages,
            },
          };
        },
      );
    },
  });

  return {
    formPages,
    formPage,
    createFormPage,
    updateFormPage,
    deleteFormPage,
  };
}
