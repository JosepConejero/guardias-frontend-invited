import { createSlice } from "@reduxjs/toolkit";

export const monthSlice = createSlice({
  name: "month",
  initialState: {
    daysInWeek: 5,
    showStatistics: false,
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
  },
});

export const { switchDaysInWeek, switchShowStatistics, resetShowStatistics } =
  monthSlice.actions;
