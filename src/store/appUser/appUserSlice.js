import { createSlice } from "@reduxjs/toolkit";

export const appUserSlice = createSlice({
  name: "appUser",
  initialState: {
    isLoadingAppUsers: true,
    appUsers: [],
    activeAppUser: null,
    //
  },
  reducers: {
    onSetActiveAppUser: (state, { payload }) => {
      /*   state.activeAppUser = state.appUsers.find(
        (appUser) => appUser.id === payload
      ); */
    },
    onSetInactiveAppUser: (state) => {
      state.activeAppUser = null;
    },
    /* onAddNewAppUser: (state, { payload }) => {
      state.appUsers.push(payload);
    }, */
    /* onGetShortNameUsers: (state, {payload})=>{

    }, */
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
  },
});

export const {
  onSetActiveAppUser,
  onSetInactiveAppUser,
  /* onGetShortNameUsers, */
  onUpdateAppUser,
  onLoadAppUsers,
  onDeleteAppUser,
} = appUserSlice.actions;
