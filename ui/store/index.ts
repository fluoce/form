import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user-slice";
import workspaceSlice from "./slice/workspace-slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    workspace: workspaceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
