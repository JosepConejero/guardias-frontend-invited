//import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SimpleDate, EventGuardDay } from "../../interfaces";
import { ShowedMonthType } from "../../types";
import { RootState } from "../store";

interface CalendarInitialState {
  isLoadingGuardDays: boolean;
  guardDays: EventGuardDay[];
  activeGuardDay: null | SimpleDate;
  showedMonth: null | ShowedMonthType;
  showedDate: Date;
}

const initialState: CalendarInitialState = {
  isLoadingGuardDays: true,
  guardDays: [],
  activeGuardDay: null,
  showedMonth: null,
  showedDate: new Date(),
};

//cambiar este any
export const calendarSlice: any = createSlice({
  ///any
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveGuardDay: (
      state: RootState,
      { payload }: { payload: EventGuardDay }
    ) => {
      state.activeGuardDay = payload;
    },

    onDeactivateGuardDay: (state: RootState) => {
      state.activeGuardDay = null;
    },
    onAddNewGuardDay: (
      state: RootState,
      { payload }: { payload: EventGuardDay }
    ) => {
      state.guardDays.push(payload);
      state.activeGuardDay = null;
    },
    onUpdateGuardDay: (
      state: RootState,
      { payload }: { payload: EventGuardDay }
    ) => {
      state.guardDays = state.guardDays.map((guardDay: EventGuardDay) => {
        if (guardDay.id === payload.id) {
          return payload;
        }
        return guardDay;
      });
      state.activeGuardDay = null;
    },
    onLoadGuardDays: (
      state: RootState,
      { payload = [] }: { payload: EventGuardDay[] }
    ) => {
      state.isLoadingGuardDays = false;
      payload.forEach((guardDay: EventGuardDay) => {
        const exists: boolean = state.guardDays.some(
          (dbGuardDay: EventGuardDay) => dbGuardDay.id === guardDay.id
        );
        if (!exists) {
          state.guardDays.push(guardDay);
        }
      });
    },
    onLogoutCalendar: (state: RootState) => {
      state.isLoadingGuardDays = true;
      state.guardDays = [];
    },
    //payload es de tipo: ShowedMonthType
    onSetShowedMonth: (
      state: RootState,
      //{ payload }: { payload: PayloadAction<ShowedMonthType> }
      { payload }: { payload: ShowedMonthType }
    ) => {
      state.showedMonth = payload;
    },
    onUpdateShowedDate: (
      state: RootState,
      { payload }: { payload: ShowedMonthType }
    ) => {
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
