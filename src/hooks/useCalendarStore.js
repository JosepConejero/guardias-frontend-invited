import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewGuardDay,
  onSetActiveGuardDay,
  onUpdateGuardDay,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { guardDays, activeGuardDay } = useSelector((state) => state.calendar);

  const setActiveGuardDay = (calendarGuardDay) => {
    dispatch(onSetActiveGuardDay(calendarGuardDay));
  };

  const guardDayInformation = ({ day, month, year }) => {
    const found = guardDays.find(
      ({
        simpleDate: {
          year: guardDayYear,
          month: guardDayMonth,
          day: guardDayDay,
        },
      }) =>
        guardDayYear === year && guardDayMonth === month && guardDayDay === day
    );
    return found;
  };

  const startSavingGuardDay = async (calendarGuardDay) => {
    //TODO: LLEGAR AL BACKEND

    //SI TODO VA BIEN
    if (calendarGuardDay._id) {
      //actualizando
      dispatch(onUpdateGuardDay({ ...calendarGuardDay }));
    } else {
      //Creando
      dispatch(
        onAddNewGuardDay({ ...calendarGuardDay, _id: new Date().getTime() })
      );
    }
  };

  return {
    //properties
    activeGuardDay,
    guardDays,
    guardDayInformation,
    hasGuardDayClicked: !!activeGuardDay,
    //methods
    setActiveGuardDay,
    startSavingGuardDay,
  };
};
