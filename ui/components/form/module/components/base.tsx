"use client"

import { useForm, useFormUpdate } from "@/hooks/use-form"
import { BASE_DATA } from "../data/base"
import { useParams } from "next/navigation"

export function Base() {
  const { formId } = useParams<{
    formId: string
  }>()

  const { data } = useForm()

  const { mutateAsync } = useFormUpdate()

  return BASE_DATA?.map((b) => (
    <div
      onClick={() => {
        if (!data?.data?.form?.title && b.type == "title") {
          mutateAsync({
            body: {
              title: b.type == "title" ? "Form Title ." : undefined,
            },

            id: formId,
          })
        } else if (!data?.data?.form?.description && b.type == "description") {
          mutateAsync({
            body: {
              description:
                b?.type == "description"
                  ? "Form's detailed description ."
                  : undefined,
            },

            id: formId,
          })
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
        {b?.icon}
      </span>
      <span className="text-sm">{b?.name}</span>
    </div>
  ))
}
