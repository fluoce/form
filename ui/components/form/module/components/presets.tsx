import { useState } from "react"
import { PRESET_DATA } from "../data/preset"
import { Spinner } from "@/components/ui/spinner"
import { useFormPagePresetCreate } from "@/hooks/use-form-page"

export function Presets() {
  const [isPending, setIsPending] = useState("")

  const { mutateAsync } = useFormPagePresetCreate()

  return PRESET_DATA?.map((p) => (
    <div
      onClick={() => {
        setIsPending(p?.name)
        mutateAsync({
          body: {
            preset: p?.type,
          },
        }).finally(() => setIsPending(""))
      }}
      key={p?.name}
      className="flex cursor-pointer items-center justify-between gap-2 rounded-lg p-2 hover:bg-accent"
    >
      <div className="flex items-center gap-2">
        <span
          className="rounded-md p-1.5"
          style={{
            backgroundColor: `${p?.color}25`,
          }}
        >
          {p?.icon}
        </span>
        <span className="line-clamp-1 text-sm">{p?.name}</span>
      </div>
      {isPending == p?.name && <Spinner />}
    </div>
  ))
}
