import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewGuardDay,
  onLoadGuardDays,
  onSetActiveGuardDay,
  onUpdateGuardDay,
  onSetShowedMonth,
} from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { useState } from "react";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { guardDays, activeGuardDay, showedMonth } = useSelector(
    (state) => state.calendar
  );
  const [isSaving, setIsSaving] = useState(false);

  const setShowedMonth = (date) => {
    dispatch(onSetShowedMonth(date));
  };

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
    try {
      setIsSaving(true);
      if (calendarGuardDay.id) {
        //actualizando
        await calendarApi.put(
          `/events/${calendarGuardDay.id}`,
          calendarGuardDay
        );
        dispatch(onUpdateGuardDay({ ...calendarGuardDay }));
        setIsSaving(false);
        return;
      }

      //Creando
      const { data } = await calendarApi.post("/events", calendarGuardDay);
      dispatch(onAddNewGuardDay({ ...calendarGuardDay, id: data.evento.id }));
      setIsSaving(false);
    } catch (error) {
      console.log("Error guardando/actualizando día de guardia");
      console.log(error);
    }
  };

  const startLoadingGuardDays = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      dispatch(onLoadGuardDays(data.eventos));
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
    isSaving,
    showedMonth,
    //methods
    setActiveGuardDay,
    startSavingGuardDay,
    startLoadingGuardDays,
    setShowedMonth,
  };
};
