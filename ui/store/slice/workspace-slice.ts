import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkspaceState {
    selectedWorkspaceId?: string;
}

const initialState: WorkspaceState = {
    selectedWorkspaceId: undefined,
};

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setWorkspaceId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedWorkspaceId = action.payload;
        },
    },
});

export const { setWorkspaceId } = workspaceSlice.actions;
export default workspaceSlice.reducer;