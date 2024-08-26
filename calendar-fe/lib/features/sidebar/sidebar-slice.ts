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
    setIsToggled(state, action: { payload: boolean }) {
      state.isToggled = action.payload;
    },
    toggleSidebar(state) {
      state.isToggled = !state.isToggled;
    },
  },
});

export const { setIsToggled, toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
