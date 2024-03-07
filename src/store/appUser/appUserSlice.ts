import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces";
import { RootState } from "../store";

interface AppUserSliceInitialState {
  isLoadingAppUsers: boolean;
  appUsers: User[];
  activeAppUser: null | User;
  isDeletingAppUser: boolean;
}

const initialState: AppUserSliceInitialState = {
  isLoadingAppUsers: true,
  appUsers: [],
  activeAppUser: null,
  isDeletingAppUser: false,
};

export const appUserSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    onSetActiveAppUser: (state: RootState, { payload }: { payload: User }) => {
      state.activeAppUser = payload;
    },
    onSetInactiveAppUser: (state: RootState) => {
      state.activeAppUser = null;
    },
    onUpdateAppUser: (state: RootState, { payload }: { payload: User }) => {
      state.appUsers = state.appUsers.map((appUser: User) => {
        if (appUser.id === payload.id) {
          return payload;
        }
        return appUser;
      });
    },
    onLoadAppUsers: (
      state: RootState,
      { payload = [] }: { payload: User[] }
    ) => {
      state.isLoadingAppUsers = false;
      payload.forEach((appUser: User) => {
        const exists: boolean = state.appUsers.some(
          (dbAppUser: User) => dbAppUser.id === appUser.id
        );
        if (!exists) {
          state.appUsers.push(appUser);
        }
      });
    },
    onDeleteAppUser: (state: RootState, { payload }: { payload: User }) => {
      state.appUsers = state.appUsers.filter(
        (appUser: User) => appUser.id !== payload.id
      );
    },
    onSetDeletingAppUser: (
      state: RootState,
      { payload }: { payload: boolean }
    ) => {
      state.isDeletingAppUser = payload;
    },
    onEmptyAppUsers: (state: RootState) => {
      state.appUsers = [];
    },
  },
});

export const {
  onSetActiveAppUser,
  onSetInactiveAppUser,
  onUpdateAppUser,
  onLoadAppUsers,
  onDeleteAppUser,
  onSetDeletingAppUser,
  onEmptyAppUsers,
} = appUserSlice.actions;

export const selectCount = (state: RootState) => state.appUser.value;

export default appUserSlice.reducer;
