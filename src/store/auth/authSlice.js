import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", //"authenticated", "not-authenticated"
    user: {},
    errorMessage: undefined,
    isChangingPassword: false,
    isRestoringPassword: false,
  },
  reducers: {
    onChecking: (state /* action */) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    onClearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
    onSetChangingPassword: (state, { payload }) => {
      state.isChangingPassword = payload;
    },
    onSetRestoringPassword: (state, { payload }) => {
      state.isRestoringPassword = payload;
    },
  },
});

export const {
  onChecking,
  onLogin,
  onLogout,
  onClearErrorMessage,
  onSetChangingPassword,
  onSetRestoringPassword,
} = authSlice.actions;
