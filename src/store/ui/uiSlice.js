import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDayModalOpen: false,
  },
  reducers: {
    onOpenDayModal: (state) => {
      state.isDayModalOpen = true;
    },
    onCloseDayModal: (state) => {
      state.isDayModalOpen = false;
    },
  },
});

export const { onOpenDayModal, onCloseDayModal } = uiSlice.actions;
