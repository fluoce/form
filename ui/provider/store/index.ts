import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import fieldIdSlice from "./slice/field-id-slice"
import pageFieldsSlice from "./slice/page-fields-slice"

export const store = configureStore({
  reducer: {
    fieldId: fieldIdSlice,
    pageFields: pageFieldsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
