import { createSlice } from "@reduxjs/toolkit";

export const monthSlice = createSlice({
  name: "month",
  initialState: {
    daysInWeek: 5,
    showStatistics: true,
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
      state.showStatistics = true;
    },
  },
});

export const { switchDaysInWeek, switchShowStatistics, resetShowStatistics } =
  monthSlice.actions;
