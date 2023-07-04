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
    onLoadTechniciansInGuardDay: (state, { payload }) => {
      state.techniciansInGuardDay = payload;
    },
    onDeleteTechnicianOpenedGuardDay: (state, { payload }) => {
      state.guardDayOpened.technicians =
        state.guardDayOpened.technicians.filter(
          (technician) => technician.uniqueId !== payload
        );
      //state.guardDayOpened.technicians.splice(payload, 1);
    },
  },
});

export const {
  onSelectGuardDay,
  onDeselectGuardDay,
  onUpdateOpenedGuardDay,
  onLoadTechniciansInGuardDay,
  onDeleteTechnicianOpenedGuardDay,
} = guardDaySlice.actions;
