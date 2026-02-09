import { createSlice } from "@reduxjs/toolkit";

//TODO-> Move constants in common file
const initialState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("token"),
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

      localStorage.setItem("token", token);
      localStorage.setItem("role", type);
      localStorage.setItem(
        "user",
        JSON.stringify({ id: user_id, name, email }),
      );
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
