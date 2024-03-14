import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  isToggled: boolean;
}

const initialState: SidebarState = {
  isToggled: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isToggled = !state.isToggled;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
