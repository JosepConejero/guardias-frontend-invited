import { createSlice } from "@reduxjs/toolkit";

const guarDaysDePrueba = [
  {
    _id: new Date().getTime(),
    simpleDate: { year: 2023, month: 4, day: 10 },
    technicians: [],
    holiday: false,
    twoHoursCourse: false,
    note: "nota 1",
    cantTechnicians: [],
  },
  {
    _id: new Date().getTime() + 1000,
    simpleDate: { year: 2023, month: 4, day: 8 },
    technicians: [],
    holiday: false,
    twoHoursCourse: false,
    note: "nota 2",
    cantTechnicians: [],
  },
  {
    _id: new Date().getTime() + 2000,
    simpleDate: { year: 2023, month: 4, day: 2 },
    technicians: [],
    holiday: false,
    twoHoursCourse: false,
    note: "nota 3",
    cantTechnicians: [],
  },
];

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingGuardDays: true, //crearé una ppdad isLoadingGuardDays para saber cuándo está cargando las guardDays y así poner alguna pantalla de Loading...
    /* guardDays: [
      //
    ], */
    guardDays: guarDaysDePrueba,
    activeGuardDay: null,
  },
  reducers: {
    onSetActiveGuardDay: (state, { payload }) => {
      state.activeGuardDay = payload;
    },
    onAddNewGuardDay: (state, { payload }) => {
      state.guardDays.push(payload);
      state.activeGuardDay = null;
    },
    onUpdateGuardDay: (state, { payload }) => {
      state.guardDays = state.guardDays.map((guardDay) => {
        if (guardDay._id === payload._id) {
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
      //ESTE SE HA DE REVISAR PORQUE NO ESTÁ CLARO QUE FUNCIONE     <<<<<<--------------------------
      state.isLoadingEvents = false;
      //state.events = payload; // esto sería correcto
      // pero si lo hago como sigue, solo insertará en events el evento que no esté ya en el events (lo hará por el id)
      payload.forEach((guardDay) => {
        const exists = state.events.some(
          (dbGuardDay) => dbGuardDay.id === guardDay.id
        );
        if (!exists) {
          state.guardDays.push(guardDay);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.guardDays = [];
      //state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveGuardDay,
  onAddNewGuardDay,
  onUpdateGuardDay,
  onLoadGuardDays,
  onLogoutCalendar,
} = calendarSlice.actions;
