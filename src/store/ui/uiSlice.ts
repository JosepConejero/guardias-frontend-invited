import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UiSliceInitialState {
  isDayModalOpen: boolean;
  isCourseModalOpen: boolean;
  isAppUsersModalOpen: boolean;
}

const initialState: UiSliceInitialState = {
  isDayModalOpen: false,
  isCourseModalOpen: false,
  isAppUsersModalOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onOpenDayModal: (state: RootState) => {
      state.isDayModalOpen = true;
    },
    onCloseDayModal: (state: RootState) => {
      state.isDayModalOpen = false;
    },
    onOpenCourseModal: (state: RootState) => {
      state.isCourseModalOpen = true;
    },
    onCloseCourseModal: (state: RootState) => {
      state.isCourseModalOpen = false;
    },
    onOpenAppUsersModal: (state: RootState) => {
      state.isAppUsersModalOpen = true;
    },
    onCloseAppUsersModal: (state: RootState) => {
      state.isAppUsersModalOpen = false;
    },
  },
});

export const {
  onOpenDayModal,
  onCloseDayModal,
  onOpenCourseModal,
  onCloseCourseModal,
  onOpenAppUsersModal,
  onCloseAppUsersModal,
} = uiSlice.actions;
