import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface MontSliceInitialState {
  daysInWeek: 5 | 6;
  showStatistics: boolean;
  showRestoreAllUsersButton: boolean;
}

const initialState: MontSliceInitialState = {
  daysInWeek: 5,
  showStatistics: false,
  showRestoreAllUsersButton: false,
};

export const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {
    switchDaysInWeek: (state: RootState) => {
      if (state.daysInWeek === 5) {
        state.daysInWeek = 6;
      } else {
        state.daysInWeek = 5;
      }
    },
    switchShowStatistics: (state: RootState) => {
      state.showStatistics = !state.showStatistics;
    },
    resetShowStatistics: (state: RootState) => {
      state.showStatistics = false;
    },
    switchShowRestoreAllUsersButton: (state: RootState) => {
      state.showRestoreAllUsersButton = !state.showRestoreAllUsersButton;
    },
    resetShowRestoreAllUsersButton: (state: RootState) => {
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
