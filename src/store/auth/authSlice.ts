import { createSlice } from "@reduxjs/toolkit";

import { StatusType } from "../../types/StatusType";
import { User, UserWithUid } from "../../interfaces";
import { RootState } from "../store";

interface AuthSliceInitialState {
  status: StatusType;
  user: User | {};
  errorMessage: string | undefined;
  isChangingPassword: boolean;
  isRestoringPassword: boolean;
}

const initialState: AuthSliceInitialState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
  isChangingPassword: false,
  isRestoringPassword: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state: RootState): void => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (
      state: RootState,
      { payload }: { payload: UserWithUid }
    ): void => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (
      state: RootState,
      { payload }: { payload: string | undefined }
    ): void => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    onClearErrorMessage: (state: RootState): void => {
      state.errorMessage = undefined;
    },
    onSetChangingPassword: (
      state: RootState,
      { payload }: { payload: boolean }
    ): void => {
      state.isChangingPassword = payload;
    },
    onSetRestoringPassword: (
      state: RootState,
      { payload }: { payload: boolean }
    ): void => {
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
