import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "@/dto/user";

let initialUser = localStorage.getItem("user");
let initialAccessToken = localStorage.getItem("accessToken");

export interface AuthorizationState {
  user: User | null;
  accessToken: string | null;
}

const initialState: AuthorizationState = {
  user: initialUser ? JSON.parse(initialUser as string) : null,
  accessToken: initialAccessToken ?? null,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    storeAuthorizedUser(state, action: PayloadAction<AuthorizationState>) {
      if (!action.payload.user || !action.payload.accessToken) return;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    clearAuthorizedUser(state) {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { storeAuthorizedUser, clearAuthorizedUser } =
  authorizationSlice.actions;
export default authorizationSlice.reducer;
