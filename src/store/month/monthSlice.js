import { createSlice } from "@reduxjs/toolkit";

export const monthSlice = createSlice({
  name: "month",
  initialState: {
    daysInWeek: 5,
    showStatistics: false,
    /* currentMonth: null,
    currentDate: {},
    currentShowedDays: [], */
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
    /* setCurrentMonth: (state, { payload }) => {
      state.currentMonth = payload;
    },
    setCurrentDate: (state, { payload }) => {
      state.currentDate = payload;
    },
    setCurrentShowedDays: (state, { payload }) => {
      state.currentShowedDays = payload;
    }, */
  },
});

export const {
  switchDaysInWeek,
  switchShowStatistics,
  resetShowStatistics,
  /* setCurrentMonth,
  setCurrentDate,
  setCurrentShowedDays, */
} = monthSlice.actions;
