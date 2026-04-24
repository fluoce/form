import { useFormUpdate } from "@/hooks/use-form"
import { THEME_DATA } from "../data/theme"
import { useParams } from "next/navigation"

export function Themes() {
  const { formId } = useParams<{ formId: string }>()

  const { mutateAsync } = useFormUpdate()

  return THEME_DATA?.map((t) => (
    <div
      key={t?.theme}
      onClick={() =>
        mutateAsync({
          body: {
            theme: t?.theme,
          },
          id: formId,
        })
      }
      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-accent"
    >
      <span
        className="h-7 w-7 rounded-md"
        style={{
          backgroundColor: `${t?.color}`,
        }}
      ></span>
      <span className="text-sm">{t?.name}</span>
    </div>
  ))
}
