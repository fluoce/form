import { FormFieldSlice, FormPageSlice, FormSlice } from "@/types/slice";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  form: Omit<FormSlice, "formPage"> | null;
  formPages: FormPageSlice[];
  selectedPage: string;
} = {
  form: null,
  formPages: [],
  selectedPage: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setFormPages: (state, action: { payload: FormPageSlice[] }) => {
      state.formPages = action.payload;
    },
    addPage: (state, action) => {
      state.formPages.push(action.payload);
    },
    removePage: (state, action) => {
      state.formPages.filter((page) => page.id == action.payload);
    },
    updatePage: (state, action: { payload: FormPageSlice }) => {
      const idx = state.formPages.findIndex(
        (page) => page.id === action.payload?.id,
      );
      if (idx !== -1) {
        state.formPages[idx] = action.payload;
      }
    },
    setSelectedPage: (state, action) => {
      state.selectedPage = action.payload;
    },
    addField: (
      state,
      action: {
        payload: { pageId: string; field: FormFieldSlice };
      },
    ) => {
      const { pageId, field } = action.payload;
      const page = state.formPages.find((page) => page.id == pageId);
      if (!page) {
        return;
      }
      page.formField.push(field);
    },
    removeField: (
      state,
      action: {
        payload: { pageId: string; fieldId: string };
      },
    ) => {
      const { pageId, fieldId } = action.payload;
      const page = state.formPages.find((page) => page.id == pageId);
      if (!page) {
        return;
      }
      page.formField.filter((field) => field.id !== fieldId);
    },
    updateField: (
      state,
      action: {
        payload: { pageId: string; field: FormFieldSlice };
      },
    ) => {
      const { pageId, field } = action.payload;

      const page = state.formPages.find((page) => page.id == pageId);
      if (!page) {
        return;
      }
      const idx = page.formField.findIndex((f) => f?.id === field?.id);
      if (idx !== -1) {
        page.formField[idx] = field;
      }
    },
  },
});

export const {
  setForm,
  setFormPages,
  addPage,
  removePage,
  updatePage,
  setSelectedPage,
  addField,
  removeField,
  updateField,
} = formSlice.actions;
export default formSlice.reducer;
