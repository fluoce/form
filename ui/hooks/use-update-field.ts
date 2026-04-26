import { useDispatch } from "react-redux"
import { useDebounceCallback } from "@/hooks/use-debounce"
import { useFieldUpdate } from "@/hooks/use-field"
import { updatePageField } from "@/provider/store/slice/page-fields-slice"
import { FormFieldUpdateType } from "@/types/form-types"

export function useUpdateField() {
  const dispatch = useDispatch()

  const { mutate } = useFieldUpdate()

  const debouncedUpdate = useDebounceCallback(
    (fieldId: string, body: FormFieldUpdateType) => {
      mutate({ fieldId, body })
    },
    500
  )

  const updateField = (fieldId: string, data: FormFieldUpdateType) => {
    dispatch(updatePageField({ fieldId, data }))
    debouncedUpdate(fieldId, data)
  }

  return { updateField }
}
