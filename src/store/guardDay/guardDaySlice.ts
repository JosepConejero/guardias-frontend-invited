import { createSlice } from "@reduxjs/toolkit";
import { DayTechnician, EventGuardDay, UserShortName } from "../../interfaces";
import { RootState } from "../store";

interface GuardDayInitialState {
  guardDayOpened: EventGuardDay | null;
  techniciansInGuardDay: UserShortName[];
  //coursesGuardDay: [],
}

const initialState: GuardDayInitialState = {
  guardDayOpened: null,
  techniciansInGuardDay: [],
};

export const guardDaySlice = createSlice({
  name: "guardDay",
  initialState,
  reducers: {
    onSelectGuardDay: (
      state: RootState,
      { payload }: { payload: EventGuardDay }
    ) => {
      state.guardDayOpened = payload;
    },
    onDeselectGuardDay: (state: RootState) => {
      state.guardDayOpened = null;
      state.techniciansInGuardDay = [];
      //state.coursesGuardDay = [];
    },
    onUpdateOpenedGuardDay: (
      state: RootState,
      { payload }: { payload: EventGuardDay }
    ) => {
      state.guardDayOpened = payload;
    },
    onLoadTechniciansInGuardDay: (
      state: RootState,
      { payload }: { payload: UserShortName[] }
    ) => {
      state.techniciansInGuardDay = payload;
    },
    onDeleteTechnicianOpenedGuardDay: (
      state: RootState,
      { payload }: { payload: string }
    ) => {
      state.guardDayOpened.technicians =
        state.guardDayOpened.technicians.filter(
          (technician: DayTechnician) => technician.uniqueId !== payload
        );
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
