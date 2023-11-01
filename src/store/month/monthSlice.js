import { createSlice } from "@reduxjs/toolkit";

export const monthSlice = createSlice({
  name: "month",
  initialState: {
    daysInWeek: 5,
    showStatistics: false,
    showRestoreAllUsersButton: false,
  },
  reducers: {
    switchDaysInWeek: (state) => {
      if (state.daysInWeek === 5) {
        state.daysInWeek = 6;
      } else {
        state.daysInWeek = 5;
      }
    },
    switchShowStatistics: (state) => {
      state.showStatistics = !state.showStatistics;
    },
    resetShowStatistics: (state) => {
      state.showStatistics = false;
    },
    switchShowRestoreAllUsersButton: (state) => {
      state.showRestoreAllUsersButton = !state.showRestoreAllUsersButton;
    },
    resetShowRestoreAllUsersButton: (state) => {
      state.showRestoreAllUsersButton = false;
    },
  },
});

export const {
  switchDaysInWeek,
  switchShowStatistics,
  resetShowStatistics,
  switchShowRestoreAllUsersButton,
  resetShowRestoreAllUsersButton,
} = monthSlice.actions;
