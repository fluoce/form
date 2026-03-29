import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user-slice";
import workspaceSlice from "./slice/workspace-slice";
import formFieldSlice from "./slice/formfield-slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    workspace: workspaceSlice,
    formField: formFieldSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
