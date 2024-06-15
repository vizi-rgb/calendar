import { createSlice } from "@reduxjs/toolkit";
import User from "@/domain/User";

interface AuthorizationState {
  user: User | null;
  accessToken: string | null;
}

const initialState: AuthorizationState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,

  accessToken: localStorage.getItem("accessToken") ?? null,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    storeAuthorizedUser(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    clearAuthorizedUser(state) {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { storeAuthorizedUser, clearAuthorizedUser } =
  authorizationSlice.actions;
export default authorizationSlice.reducer;
