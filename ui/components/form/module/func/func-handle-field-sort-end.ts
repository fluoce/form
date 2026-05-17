import { FormFieldType } from "@/types/form-types"
import type { DragEndEvent } from "@dnd-kit/react"

export function funcHandleFieldSortEnd({
  e,
  originalIndex,
  pageFields,
  updateField,
}: {
  e: DragEndEvent
  pageFields: FormFieldType[]
  originalIndex: number
  updateField: (args: {
    body: {
      prevFieldId: string
      nextFieldId: string
    }
    fieldId: string
  }) => void
}) {
  const { source } = e.operation ?? {}
  if (!source || !source?.id || !pageFields?.length) return null
  const newIndex = pageFields?.findIndex((f) => f.id === source.id)
  if (newIndex == originalIndex || newIndex == -1) return
  const prevField = pageFields[newIndex - 1] ?? null
  const nextField = pageFields[newIndex + 1] ?? null
  updateField({
    body: {
      prevFieldId: prevField?.id,
      nextFieldId: nextField?.id,
    },
    fieldId: String(source?.id),
  })
}
