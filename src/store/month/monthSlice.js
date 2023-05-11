import { createSlice } from "@reduxjs/toolkit";

export const monthSlice = createSlice({
  name: "month",
  initialState: {
    daysInWeek: 5,
  },
  reducers: {
    switchDaysInWeek: (state) => {
      if (state.daysInWeek === 5) {
        state.daysInWeek = 6;
      } else {
        state.daysInWeek = 5;
      }
    },
  },
});

export const { switchDaysInWeek } = monthSlice.actions;
