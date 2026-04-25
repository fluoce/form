import { queryKeys } from "@/const/query-key"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useSearchParams } from "next/navigation"
import { useFetch } from "./use-fetch"
import { urls } from "@/const/urls"
import {
  FormFieldCreateType,
  FormFieldType,
  FormFieldUpdateType,
} from "@/types/form-types"
import { toast } from "sonner"
import { ResType } from "@/types/res-types"
import { useAppDispatch } from "@/provider/store"
import { setFieldId } from "@/provider/store/slice/field-id-slice"

export function useFields() {
  const { formId } = useParams<{ formId: string }>()
  const searchParmas = useSearchParams()
  const formPageId = searchParmas.get("page")!
  return useQuery({
    queryKey: queryKeys.field.all({
      formId,
      formPageId,
    }),
    queryFn: () =>
      useFetch({
        url: urls.field.all({ formId, formPageId }),
        method: "GET",
      }) as Promise<
        ResType<{
          formFields: FormFieldType[]
        }>
      >,
  })
}

export function useField({ fieldId }: { fieldId: string }) {
  const { formId } = useParams<{ formId: string }>()
  const searchParmas = useSearchParams()
  const formPageId = searchParmas.get("page")!
  return useQuery({
    queryKey: queryKeys.field.byId({
      formId,
      formPageId,
      fieldId,
    }),
    queryFn: () =>
      useFetch({
        url: urls.field.byId({ formId, formPageId, fieldId }),
        method: "GET",
      }) as Promise<
        ResType<{
          formField: FormFieldType
        }>
      >,
    enabled:
      Boolean(formId) &&
      Boolean(formPageId) &&
      Boolean(fieldId && fieldId !== "base"),
  })
}

export function useFieldCreate() {
  const { formId } = useParams<{ formId: string }>()
  const searchParmas = useSearchParams()
  const formPageId = searchParmas.get("page")!
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ body }: { body: FormFieldCreateType }) =>
      useFetch({
        url: urls.field.create({ formId, formPageId }),
        method: "POST",
        body,
      }) as Promise<
        ResType<{
          formField: FormFieldType
        }>
      >,
    onError: (error) => {
      toast.error(error?.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.field.all({
          formId,
          formPageId,
        }),
      })
    },
  })
}

export function useFieldUpdate() {
  const { formId } = useParams<{ formId: string }>()
  const searchParmas = useSearchParams()
  const formPageId = searchParmas.get("page")!
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      body,
      fieldId,
    }: {
      body: FormFieldUpdateType
      fieldId: string
    }) =>
      useFetch({
        url: urls.field.byId({ formId, formPageId, fieldId }),
        method: "PATCH",
        body,
      }) as Promise<
        ResType<{
          formField: FormFieldType
        }>
      >,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.field.all({
          formId,
          formPageId,
        }),
      })
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export function useFieldDelete() {
  const dispatch = useAppDispatch()
  const { formId } = useParams<{ formId: string }>()
  const searchParmas = useSearchParams()
  const formPageId = searchParmas.get("page")!
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ fieldId }: { fieldId: string }) =>
      useFetch({
        url: urls.field.byId({ formId, formPageId, fieldId }),
        method: "DELETE",
      }) as Promise<
        ResType<{
          formField: FormFieldType
        }>
      >,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.field.all({
          formId,
          formPageId,
        }),
      })
      dispatch(setFieldId(null))
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}
