import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewGuardDay,
  onLoadGuardDays,
  onSetActiveGuardDay,
  onUpdateGuardDay,
} from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";

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
    if (calendarGuardDay.id) {
      //actualizando

      // const { data } =
      await calendarApi.put(`/events/${calendarGuardDay.id}`, calendarGuardDay);

      dispatch(onUpdateGuardDay({ ...calendarGuardDay }));
    } else {
      //Creando
      const { data } = await calendarApi.post("/events", calendarGuardDay);

      dispatch(onAddNewGuardDay({ ...calendarGuardDay, id: data.evento.id }));
    }
  };

  const startLoadingGuardDays = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      dispatch(onLoadGuardDays(data.eventos));
      //console.log(data);
    } catch (error) {
      console.log("Error cargando días de guardia");
      console.log(error);
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
    startLoadingGuardDays,
  };
};
