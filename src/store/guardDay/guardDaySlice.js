import { createSlice } from "@reduxjs/toolkit";

export const guardDaySlice = createSlice({
  name: "guardDay",
  initialState: {
    guardDayOpened: null,
    techniciansInGuardDay: [],
    coursesGuardDay: [],
  },
  reducers: {
    onSelectGuardDay: (state, { payload }) => {
      state.guardDayOpened = payload;
    },
    onDeselectGuardDay: (state) => {
      state.guardDayOpened = null;
      state.techniciansInGuardDay = [];
      state.coursesGuardDay = [];
    },
    onUpdateOpenedGuardDay: (state, { payload }) => {
      state.guardDayOpened = payload; //hace lo mismo que onSelectGuardDay (se podría refactorizar)
    },
    /*  onLoadTechniciansGuardDay: (state, { payload }) => {
      state.techniciansGuardDay = payload;
    },
    onEmptyTechniciansGuardDay: (state) => {
      state.techniciansGuardDay = [];
    },*/
    onLoadTechniciansInGuardDay: (state, { payload }) => {
      state.techniciansInGuardDay = payload;
    },
    /* onEmptyTechniciansInGuardDay: (state) => {
      state.techniciansInGuardDay = [];
    }, */
    /*onLoadTechniciansOutGuardDay: (state, { payload }) => {
      state.techniciansOutGuardDay = payload;
    },
    onEmptyTechniciansOutGuardDay: (state) => {
      state.techniciansOutGuardDay = [];
    }, */
  },
});

export const {
  onSelectGuardDay,
  onDeselectGuardDay,
  onUpdateOpenedGuardDay,
  /*   onLoadTechniciansGuardDay,
  onEmptyTechniciansGuardDay,*/
  onLoadTechniciansInGuardDay,
  //onEmptyTechniciansInGuardDay,
  /*onLoadTechniciansOutGuardDay,
  onEmptyTechniciansOutGuardDay, */
} = guardDaySlice.actions;
