import { useFormUpdate } from "@/hooks/use-form"
import { THEME_DATA } from "../data/theme"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"

export function Themes() {
  const { formId } = useParams<{ formId: string }>()

  const { mutateAsync } = useFormUpdate()

  const [isPending, setIsPending] = useState("")

  return THEME_DATA?.map((t) => (
    <div
      key={t?.theme}
      onClick={() => {
        setIsPending(t?.theme)
        mutateAsync({
          body: {
            theme: t?.theme,
          },
          id: formId,
        }).finally(() => setIsPending(""))
      }}
      className="flex cursor-pointer items-center justify-between gap-2 rounded-lg p-2 hover:bg-accent"
    >
      <div className="flex items-center gap-2">
        <span
          className="h-7 w-7 rounded-md"
          style={{
            backgroundColor: `${t?.color}`,
          }}
        ></span>
        <span className="text-sm">{t?.name}</span>
      </div>
      {isPending == t?.theme && <Spinner />}
    </div>
  ))
}
