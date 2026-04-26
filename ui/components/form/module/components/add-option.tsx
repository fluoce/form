import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUpdateField } from "@/hooks/use-update-field"
import { useAppDispatch } from "@/provider/store"
import { updatePageField } from "@/provider/store/slice/page-fields-slice"
import { FormFieldType } from "@/types/form-types"
import { normalizeString } from "@/utils/normalize-string"
import { Plus } from "lucide-react"
import { useState } from "react"

export function AddOption({ field }: { field: FormFieldType }) {
  const { updateField } = useUpdateField()

  const [option, setOption] = useState("")

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (option) {
      updateField(field?.id, {
        config: {
          ...field?.config,
          //@ts-ignore
          options: [
            //@ts-ignore
            ...field?.config?.options,
            {
              label: option,
              value: normalizeString(option),
            },
          ],
        },
      })
      setOption("")
    }
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <Input
        value={option}
        type="text"
        placeholder="Add Option . . ."
        onChange={(e) => {
          setOption(e?.target?.value)
        }}
      />
      <Button disabled={!option} variant="secondary" size="icon-sm">
        <Plus />
      </Button>
    </form>
  )
}
