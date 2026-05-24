import { useMutation, useQuery } from "@tanstack/react-query"
import { urls } from "@/const/urls"
import {
  SubmitAnswerType,
  SubmitOverviewType,
  SubmitType,
} from "@/types/submit-types"
import { toast } from "sonner"
import { ResType } from "@/types/res-types"
import { envs } from "@/const/envs"
import { queryKeys } from "@/const/query-key"
import UseServer from "./use-server"

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
          submissions: SubmitType[]
        }>
      >,
    enabled: Boolean(formId),
  })
}
