import { createSlice } from "@reduxjs/toolkit";

export const appUserSlice = createSlice({
  name: "appUser",
  initialState: {
    isLoadingAppUsers: true,
    appUsers: [],
    activeAppUser: null,
    isDeletingAppUser: false,
  },
  reducers: {
    onSetActiveAppUser: (state, { payload }) => {
      state.activeAppUser = payload;
    },
    onSetInactiveAppUser: (state) => {
      state.activeAppUser = null;
    },
    onUpdateAppUser: (state, { payload }) => {
      state.appUsers = state.appUsers.map((appUser) => {
        if (appUser.id === payload.id) {
          return payload;
        }
        return appUser;
      });
    },
    onLoadAppUsers: (state, { payload = [] }) => {
      state.isLoadingAppUsers = false;
      payload.forEach((appUser) => {
        const exists = state.appUsers.some(
          (dbAppUser) => dbAppUser.id === appUser.id
        );
        if (!exists) {
          state.appUsers.push(appUser);
        }
      });
    },
    onDeleteAppUser: (state, { payload }) => {
      state.appUsers = state.appUsers.filter(
        (appUser) => appUser.id !== payload.id
      );
    },
    onSetDeletingAppUser: (state, { payload }) => {
      state.isDeletingAppUser = payload;
    },
    onEmptyAppUsers: (state) => {
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
