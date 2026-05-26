import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { urls } from "@/const/urls"
import {
  SubmissionsType,
  SubmitAnswerType,
  SubmitOverviewType,
} from "@/types/submit-types"
import { ResType } from "@/types/res-types"
import { envs } from "@/const/envs"
import { queryKeys } from "@/const/query-key"
import UseServer from "./use-server"
import { useParams } from "next/navigation"
import { toast } from "sonner"

export function useSubmitAdd() {
  return useMutation({
    mutationFn: async ({ body }: { body: SubmitAnswerType }) => {
      const res = await fetch(
        `${envs?.backendUrl}${urls.submit.addSubmit({ formId: body?.formId })}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
      return (await res.json()) as ResType<any>
    },
  })
}

export function useSubmitCount({ formId }: { formId: string }) {
  return useQuery({
    queryKey: queryKeys.submit.count({ formId }),
    queryFn: () =>
      UseServer({
        url: urls.submit.overview({ formId }),
        method: "GET",
      }) as Promise<
        ResType<{
          overview: SubmitOverviewType
        }>
      >,
    enabled: Boolean(formId),
  })
}

export function useSubmits({ formId }: { formId: string }) {
  return useQuery({
    queryKey: queryKeys.submit.all({ formId }),
    queryFn: () =>
      UseServer({
        url: urls.submit.all({ formId }),
        method: "GET",
      }) as Promise<
        ResType<{
          submissions: SubmissionsType
        }>
      >,
    enabled: Boolean(formId),
  })
}

export function useSubmitsDelete() {
  const { formId } = useParams<{ formId: string }>()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ submitIds }: { submitIds: string[] }) =>
      UseServer({
        url: urls.submit.all({ formId }),
        method: "DELETE",
        body: {
          submitIds,
        },
      }) as Promise<ResType<any>>,
    onError: (error) => {
      toast.error(error?.message)
    },
    onSuccess: (_, variables) => {
      const ids = variables?.submitIds ?? []
      queryClient.setQueryData(
        queryKeys.submit.all({ formId }),
        (oldData: ResType<{ submissions: SubmissionsType }> | undefined) => {
          if (!oldData || !oldData?.data || !oldData?.data?.submissions)
            return oldData
          return {
            ...oldData,
            data: {
              ...oldData?.data,
              submissions: {
                ...oldData?.data?.submissions,
                submissions: oldData?.data?.submissions?.submissions
                  ? oldData?.data?.submissions?.submissions?.filter(
                      (submit: any) => !ids?.includes(submit?.id)
                    )
                  : oldData?.data?.submissions?.submissions,
              },
            },
          }
        }
      )
    },
  })
}
