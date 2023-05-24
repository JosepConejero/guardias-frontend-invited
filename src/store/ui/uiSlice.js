import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDayModalOpen: false,
    isCourseModalOpen: false,
    isAppUsersModalOpen: false,
  },
  reducers: {
    onOpenDayModal: (state) => {
      state.isDayModalOpen = true;
    },
    onCloseDayModal: (state) => {
      state.isDayModalOpen = false;
    },
    onOpenCourseModal: (state) => {
      state.isCourseModalOpen = true;
    },
    onCloseCourseModal: (state) => {
      state.isCourseModalOpen = false;
    },
    onOpenAppUsersModal: (state) => {
      state.isAppUsersModalOpen = true;
    },
    onCloseAppUsersModal: (state) => {
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
