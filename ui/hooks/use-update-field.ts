import { useDispatch } from "react-redux"
import { useDebounceCallback } from "@/hooks/use-debounce"
import { useFieldUpdate } from "@/hooks/use-field"
import { updatePageField } from "@/provider/store/slice/page-fields-slice"
import { FormFieldUpdateType } from "@/types/form-types"
import isEqual from "lodash/isEqual"
import { useAppSelector } from "@/provider/store"

export function useUpdateField() {
  const dispatch = useDispatch()

  const pageField = useAppSelector((state) => state.pageFields.fields)

  const { mutate } = useFieldUpdate()

  const debouncedUpdate = useDebounceCallback(
    (fieldId: string, body: FormFieldUpdateType) => {
      mutate({ fieldId, body })
    },
    500
  )

  const updateField = (fieldId: string, data: FormFieldUpdateType) => {
    const field = pageField?.find((f) => f?.id === fieldId)
    if (!field) return
    if (isEqual(field?.config, data?.config)) return
    dispatch(updatePageField({ fieldId, data }))
    debouncedUpdate(fieldId, data)
  }

  return { updateField }
}
