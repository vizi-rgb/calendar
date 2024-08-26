import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "@/dto/user";

export interface AuthorizationState {
  user: User | null;
  accessToken: string | null;
}

const initialState: AuthorizationState = {
  user: null,
  accessToken: null,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState: initialState,
  reducers: {
    storeAuthorizedUser(state, action: PayloadAction<AuthorizationState>) {
      if (!action.payload.user || !action.payload.accessToken) return;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearAuthorizedUser(state) {
      state.accessToken = null;
    },
  },
});

export const { storeAuthorizedUser, clearAuthorizedUser } =
  authorizationSlice.actions;
export default authorizationSlice.reducer;
