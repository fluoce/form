import { useMutation } from "@tanstack/react-query"
import { urls } from "@/const/urls"
import { SubmitAnswerType } from "@/types/submit-types"
import { toast } from "sonner"
import { ResType } from "@/types/res-types"
import { envs } from "@/const/envs"

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
