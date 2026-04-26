import { FormFieldType, FormFieldUpdateType } from "@/types/form-types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PageFields {
  fields: FormFieldType[]
}

const initialState: PageFields = {
  fields: [],
}

export const pageFieldsSlice = createSlice({
  name: "pageFields",
  initialState,
  reducers: {
    setPageFields: (state, action: PayloadAction<FormFieldType[]>) => {
      state.fields = action.payload
    },
    updatePageField: (
      state,
      action: PayloadAction<{ fieldId: string; data: FormFieldUpdateType }>
    ) => {
      const { fieldId, data } = action.payload
      const field = state.fields.find((f) => f.id === fieldId)
      if (field) {
        Object.assign(field, data)
      }
    },
    deletePageField: (state, action: PayloadAction<string>) => {
      state.fields.filter((f) => f.id !== action.payload)
    },
  },
})

export const { setPageFields, updatePageField, deletePageField } =
  pageFieldsSlice.actions

export default pageFieldsSlice.reducer
