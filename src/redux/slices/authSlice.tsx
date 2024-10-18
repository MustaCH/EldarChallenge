import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types/user";

const initialState: UserState = {
  isAuthorized: false,
  role: null,
};

const storedAuthState = localStorage.getItem("authState");
const parsedAuthState = storedAuthState
  ? JSON.parse(storedAuthState)
  : initialState;

const authSlice = createSlice({
  name: "auth",
  initialState: parsedAuthState,
  reducers: {
    login: (state, action: PayloadAction<{ role: string | null }>) => {
      state.isAuthorized = true;
      state.role = action.payload.role;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthorized = false;
      state.role = null;
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
