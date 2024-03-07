import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { monthSlice } from "./month/monthSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";
import { courseSlice } from "./course/courseSlice";
import { appUserSlice } from "./appUser/appUserSlice";
import { guardDaySlice } from "./guardDay/guardDaySlice";

//cambiar este any
export const store: any = configureStore({
  ///any
  reducer: {
    auth: authSlice.reducer,
    month: monthSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
    course: courseSlice.reducer,
    appUser: appUserSlice.reducer,
    guardDay: guardDaySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
/* export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); */
// export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
