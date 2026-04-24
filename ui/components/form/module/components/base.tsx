"use client"

import { useFormUpdate } from "@/hooks/use-form"
import { BASE_DATA } from "../data/base"
import { useParams } from "next/navigation"

export function Base() {
  const { formId } = useParams<{
    formId: string
  }>()

  const { mutateAsync } = useFormUpdate()

  return BASE_DATA?.map((b) => (
    <div
      onClick={() =>
        mutateAsync({
          body: {
            title:
              b.type == "title" ? "Galactic Pizza Feedback Sheet" : undefined,
            description:
              b?.type == "description"
                ? "Tell us about your cosmic pizza experience and favorite interstellar toppings."
                : undefined,
          },

          id: formId,
        })
      }
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
