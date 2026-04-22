import { queryKeys } from "@/const/query-key"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useFetch } from "./use-fetch"
import { urls } from "@/const/urls"
import { ResType } from "@/types/res-types"
import { FormCreateType, FormType, FormUpdateType } from "@/types/form-types"
import { toast } from "sonner"

export function useForms() {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  return useQuery({
    queryKey: queryKeys.form.all({ workspaceId }),
    queryFn: () =>
      useFetch({
        url: urls.form.all({ workspaceId }),
        method: "GET",
      }) as Promise<ResType<{ forms: FormType[] }>>,
  })
}

export function useForm() {
  const { formId } = useParams<{ formId: string }>()
  return useQuery({
    queryKey: queryKeys.form.byId({ formId }),
    queryFn: () =>
      useFetch({
        url: urls.form.byId({ formId }),
        method: "GET",
      }) as Promise<ResType<{ form: FormType }>>,
  })
}

export function useFormTrash() {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  return useQuery({
    queryKey: queryKeys.form.trash({ workspaceId }),
    queryFn: () =>
      useFetch({
        url: urls.form.trash({ workspaceId }),
        method: "GET",
      }) as Promise<ResType<{ forms: FormType[] }>>,
  })
}

export function useFormCreate() {
  const queryClient = useQueryClient()
  const { workspaceId } = useParams<{ workspaceId: string }>()
  return useMutation({
    mutationFn: (body: FormCreateType) =>
      useFetch({
        url: urls.form.create({ workspaceId }),
        method: "POST",
        body,
      }) as Promise<ResType<{ form: FormType }>>,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.form.all({
          workspaceId,
        }),
      })
    },
  })
}

export function useFormUpdate() {
  const queryClient = useQueryClient()
  const { workspaceId } = useParams<{ workspaceId: string }>()
  return useMutation({
    mutationFn: ({ body, id }: { body: FormUpdateType; id: string }) =>
      useFetch({
        url: urls.form.byId({ formId: id }),
        method: "PATCH",
        body,
      }) as Promise<ResType<{ form: FormType }>>,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.form.all({
          workspaceId,
        }),
      })
      if (
        variables.body.status == "ARCHIVED" ||
        variables.body.status == "DRAFT"
      ) {
        queryClient.refetchQueries({
          queryKey: queryKeys.form.trash({ workspaceId }),
        })
      }
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export function useFormDelete() {
  const queryClient = useQueryClient()
  const { workspaceId } = useParams<{ workspaceId: string }>()
  return useMutation({
    mutationFn: ({ formId }: { formId: string }) =>
      useFetch({
        url: urls.form.byId({ formId }),
        method: "DELETE",
      }) as Promise<ResType<{ form: FormType }>>,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.form.trash({ workspaceId }),
      })
    },
  })
}
