import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FieldIdState {
  fieldId: string | null
}

const initialState: FieldIdState = {
  fieldId: null,
}

export const fieldIdSlice = createSlice({
  name: "fieldId",
  initialState,
  reducers: {
    setFieldId: (state, action: PayloadAction<string | null>) => {
      state.fieldId = action.payload
    },
    clearFieldId: (state) => {
      state.fieldId = null
    },
  },
})

export const { setFieldId, clearFieldId } = fieldIdSlice.actions

export default fieldIdSlice.reducer
