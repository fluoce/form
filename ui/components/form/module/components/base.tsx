"use client"

import { useForm, useFormUpdate } from "@/hooks/use-form"
import { BASE_DATA } from "../data/base"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"

export function Base() {
  const { formId } = useParams<{
    formId: string
  }>()

  const { data } = useForm()

  const { mutateAsync } = useFormUpdate()

  const [isPending, setIsPending] = useState("")

  return BASE_DATA?.map((b) => (
    <div
      onClick={() => {
        if (!data?.data?.form?.title && b.type == "title") {
          setIsPending(b?.name)
          mutateAsync({
            body: {
              title: b.type == "title" ? "Form Title ." : undefined,
            },

            id: formId,
          }).finally(() => setIsPending(""))
        } else if (!data?.data?.form?.description && b.type == "description") {
          setIsPending(b?.name)
          mutateAsync({
            body: {
              description:
                b?.type == "description"
                  ? "Form's detailed description ."
                  : undefined,
            },

            id: formId,
          }).finally(() => setIsPending(""))
        }
      }}
      key={b?.name}
      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-accent"
    >
      <span
        className="rounded-md p-1.5"
        style={{
          backgroundColor: `${b?.color}25`,
        }}
      >
        {isPending == b?.name ? <Spinner /> : b?.icon}
      </span>
      <span className="text-sm">{b?.name}</span>
    </div>
  ))
}
