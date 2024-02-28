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
import { EventGuardDay, SimpleDate } from "../interfaces";
import { ShowedMonthType } from "../types";
import { RootState } from "../store";

interface useCalendarStoreReturnTypes {
  activeGuardDay: SimpleDate;
  guardDays: EventGuardDay[];
  guardDayInformation: ({ day, month, year }: SimpleDate) => EventGuardDay;
  hasGuardDayClicked: boolean;
  isSaving: boolean;
  showedMonth: ShowedMonthType;
  setActiveGuardDay: (calendarGuardDay: SimpleDate) => void;
  startSavingGuardDay: (calendarGuardDay: EventGuardDay) => Promise<void>;
  startLoadingGuardDays: () => Promise<void>;
  setShowedMonth: (date: ShowedMonthType) => void;
}

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { guardDays, activeGuardDay, showedMonth } = useSelector(
    (state: RootState) => state.calendar
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const setShowedMonth = (date: ShowedMonthType): void => {
    dispatch(onSetShowedMonth(date));
  };

  const setActiveGuardDay = (calendarGuardDay: SimpleDate): void => {
    dispatch(onSetActiveGuardDay(calendarGuardDay));
  };

  const guardDayInformation = ({
    day,
    month,
    year,
  }: SimpleDate): EventGuardDay => {
    const found: EventGuardDay = guardDays.find(
      ({
        simpleDate: {
          year: guardDayYear,
          month: guardDayMonth,
          day: guardDayDay,
        },
      }: {
        simpleDate: SimpleDate;
      }) =>
        guardDayYear === year && guardDayMonth === month && guardDayDay === day
    );
    return found;
  };

  const startSavingGuardDay = async (
    calendarGuardDay: EventGuardDay
  ): Promise<void> => {
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

  const startLoadingGuardDays = async (): Promise<void> => {
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
  } as useCalendarStoreReturnTypes;
};
