import { createSlice } from "@reduxjs/toolkit";

const accountID = localStorage.getItem("accountID");
const accountCode = localStorage.getItem("accountCode");
const roleId = localStorage.getItem("roleId");
const token = localStorage.getItem("token");
const loggedIn = localStorage.getItem("loggedIn");

const initialState = {
  accountID,
  accountCode,
  roleId,
  token,
  loggedIn,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accountID = action.payload.accountID;
      state.accountCode = action.payload.accountCode;
      state.roleId = action.payload.roleId;
      state.token = action.payload.token;
      state.loggedIn = action.payload.loggedIn;
    },
    logout: (state) => {
      localStorage.removeItem("accountID");
      localStorage.removeItem("accountCode");
      localStorage.removeItem("roleId");
      localStorage.removeItem("token");
      localStorage.removeItem("loggedIn");
      state.accountID = "";
      state.accountCode = "";
      state.roleId = "";
      state.token = "";
      state.loggedIn = false;
    },
  },
});
export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectCurrentToken = (state) => state.token;
export const isLoggedIn = (state) => state.user.loggedIn;

export default userSlice.reducer;
