import { UserSlice } from "@/types/slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user?: UserSlice | undefined;
}

const initialState: UserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserSlice | undefined>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
