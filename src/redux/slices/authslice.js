import { createSlice } from "@reduxjs/toolkit";
import { ROLE, TOKEN, USER } from "../../constants/AppConst";

const initialState = {
  token: localStorage.getItem(TOKEN) || null,
  role: localStorage.getItem(ROLE) || null,
  user: JSON.parse(localStorage.getItem(USER) || null),
  isAuthenticated: !!localStorage.getItem(TOKEN),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, type, user_id, name, email } = action.payload;
      state.token = token;
      state.role = type;
      state.user = { id: user_id, name, email };
      state.isAuthenticated = true;

      localStorage.setItem(TOKEN, token);
      localStorage.setItem(ROLE, type);
      localStorage.setItem(
        USER,
        JSON.stringify({ id: user_id, name, email }),
      );
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem(TOKEN);
      localStorage.removeItem(ROLE);
      localStorage.removeItem(USER);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
