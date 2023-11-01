import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingGuardDays: true,
    guardDays: [],
    activeGuardDay: null,
    showedMonth: null,
    showedDate: new Date(),
  },
  reducers: {
    onSetActiveGuardDay: (state, { payload }) => {
      state.activeGuardDay = payload;
    },

    onDeactivateGuardDay: (state) => {
      state.activeGuardDay = null;
    },
    onAddNewGuardDay: (state, { payload }) => {
      state.guardDays.push(payload);
      state.activeGuardDay = null;
    },
    onUpdateGuardDay: (state, { payload }) => {
      state.guardDays = state.guardDays.map((guardDay) => {
        if (guardDay.id === payload.id) {
          return payload;
        }
        return guardDay;
      });
      state.activeGuardDay = null;
    },
    onLoadGuardDays: (state, { payload = [] }) => {
      state.isLoadingGuardDays = false;
      payload.forEach((guardDay) => {
        const exists = state.guardDays.some(
          (dbGuardDay) => dbGuardDay.id === guardDay.id
        );
        if (!exists) {
          state.guardDays.push(guardDay);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingGuardDays = true;
      state.guardDays = [];
    },
    onSetShowedMonth: (state, { payload }) => {
      state.showedMonth = payload;
    },
    onUpdateShowedDate: (state, { payload }) => {
      state.showedDate = payload;
    },
  },
});

export const {
  onSetActiveGuardDay,
  onDeactivateGuardDay,
  onAddNewGuardDay,
  onUpdateGuardDay,
  onLoadGuardDays,
  onLogoutCalendar,
  onSetShowedMonth,
  onUpdateShowedDate,
} = calendarSlice.actions;
