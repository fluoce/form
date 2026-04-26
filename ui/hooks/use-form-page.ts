import { queryKeys } from "@/const/query-key"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useSearchParams } from "next/navigation"
import { useFetch } from "./use-fetch"
import { urls } from "@/const/urls"
import { ResType } from "@/types/res-types"
import {
  FormPageCreateType,
  FormPageType,
  FormPageUpdateType,
} from "@/types/form-types"
import { toast } from "sonner"

export function useFormPages() {
  const { formId } = useParams<{
    formId: string
  }>()
  return useQuery({
    queryKey: queryKeys.formPage.all({ formId }),
    queryFn: () =>
      useFetch({
        url: urls.formPage.all({ formId }),
        method: "GET",
      }) as Promise<
        ResType<{
          formPages: FormPageType[]
        }>
      >,
  })
}

export function useFormPage() {
  const { formId } = useParams<{
    formId: string
  }>()
  const searchParams = useSearchParams()
  const formPageId = searchParams.get("page")!
  return useQuery({
    queryKey: queryKeys.formPage.byId({ formId, formPageId }),
    queryFn: () =>
      useFetch({
        url: urls.formPage.all({ formId }),
        method: "GET",
      }) as Promise<
        ResType<{
          formPage: FormPageType
        }>
      >,
  })
}

export function useFormPageCreate() {
  const { formId } = useParams<{
    formId: string
  }>()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ body }: { body: FormPageCreateType }) =>
      useFetch({
        url: urls.formPage.create({ formId }),
        method: "POST",
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.formPage.all({ formId }),
      })
    },
  })
}

export function useFormPageUpdate() {
  const { formId } = useParams<{
    formId: string
  }>()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      body,
      formPageId,
    }: {
      formPageId: string
      body: FormPageUpdateType
    }) =>
      useFetch({
        url: urls.formPage.byId({ formId, formPageId }),
        method: "PATCH",
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.formPage.all({
          formId,
        }),
      })
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export function useFormPageDelete() {
  const { formId } = useParams<{
    formId: string
  }>()
  const searchParams = useSearchParams()
  const pageId = searchParams.get("page")
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ formPageId }: { formPageId: string }) =>
      useFetch({
        url: urls.formPage.byId({ formId, formPageId }),
        method: "DELETE",
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.formPage.all({
          formId,
        }),
      })
      if (pageId == variables?.formPageId) {
        const params = new URLSearchParams(window.location.search)
        params.delete("page")
        window.history.replaceState(null, "", `?${params.toString()}`)
      }
    },
  })
}
