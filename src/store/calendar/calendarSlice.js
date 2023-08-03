import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingGuardDays: true, //crearé una ppdad isLoadingGuardDays para saber cuándo está cargando las guardDays y así poner alguna pantalla de Loading...
    guardDays: [],
    activeGuardDay: null,
    showedMonth: null,
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
    /*  onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      } else {
        console.log("no hay notas activas");
      }
    }, */
    onLoadGuardDays: (state, { payload = [] }) => {
      state.isLoadingGuardDays = false;
      //state.events = payload; // esto sería correcto
      // pero si lo hago como sigue, solo insertará en events el evento que no esté ya en el events (lo hará por el id)
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
      //state.activeEvent = null;
    },
    onSetShowedMonth: (state, { payload }) => {
      state.showedMonth = payload;
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
} = calendarSlice.actions;
