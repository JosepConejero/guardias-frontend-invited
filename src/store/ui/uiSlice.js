import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDayModalOpen: false,
    isCourseModalOpen: false,
    isUsersModalOpen: false,
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
    onOpenUsersModal: (state) => {
      state.isUsersModalOpen = true;
    },
    onCloseUsersModal: (state) => {
      state.isUsersModalOpen = false;
    },
  },
});

export const {
  onOpenDayModal,
  onCloseDayModal,
  onOpenCourseModal,
  onCloseCourseModal,
  onOpenUsersModal,
  onCloseUsersModal,
} = uiSlice.actions;
