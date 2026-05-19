import { envs } from "@/const/envs"
import { urls } from "@/const/urls"
import { FormType } from "@/types/form-types"
import { ResType } from "@/types/res-types"
import { useQuery } from "@tanstack/react-query"

export function useGetForm({ formId }: { formId: string }) {
  return useQuery({
    queryKey: ["form", formId],
    queryFn: async () => {
      const res = await fetch(
        `${envs?.backendUrl}${urls?.form.public({ formId })}`
      )
      const data = (await res?.json()) as Promise<ResType<{ form: FormType }>>

      return data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: Boolean(formId),
  })
}
