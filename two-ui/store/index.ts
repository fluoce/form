import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user-slice";
import workspaceSlice from "./slice/workspace-slice";
import formSlice from "./slice/form-slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    workspace: workspaceSlice,
    form: formSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
