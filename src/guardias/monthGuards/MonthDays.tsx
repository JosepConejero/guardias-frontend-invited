/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Grid } from "@mui/material";
import { Day } from "./Day";
import { isWeekend, isSunday } from "../../helpers/myCalendar";

import { useDispatch, useSelector } from "react-redux";
import { DayModal } from "../modals/DayModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { getDayOfWeekText } from "../../helpers/dayOfWeek";
import { BasicModal } from "../modals/basicModal/BasicModal";
import { useGuardDayStore } from "../../hooks/useGuardDayStore";
import { onDeactivateGuardDay } from "../../store/calendar/calendarSlice";
import { RootState } from "../../store";
import { SimpleDate } from "../../interfaces";

export const MonthDays = ({
  showedDays,
}: {
  showedDays: SimpleDate[];
}): JSX.Element => {
  const dispatch = useDispatch();
  const { isDayModalOpen, openDayModal, closeDayModal } = useUiStore();
  const { setActiveGuardDay, guardDayInformation } = useCalendarStore();
  const { deselectGuardDay } = useGuardDayStore();

  const { daysInWeek }: { daysInWeek: number } = useSelector(
    (state: RootState) => state.month
  );

  const onDayClick = (day: number, month: number, year: number): void => {
    setActiveGuardDay({ day, month, year });
    openDayModal();
  };

  const handleCloseDayModal = (): void => {
    dispatch(onDeactivateGuardDay());
    closeDayModal();
    deselectGuardDay();
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={{ xs: 2, md: 0 }}
        sx={{
          maxWidth: daysInWeek === 6 ? "1300px" : "900px",
          margin: "auto",
        }}
      >
        {showedDays.map((date: SimpleDate, index: number) => {
          if (daysInWeek === 6 && !isSunday(index)) {
            return (
              <Grid item key={index} sx={{ m: 1 / 2 }}>
                <Day
                  date={date}
                  dayOfWeekText={getDayOfWeekText(index)}
                  onDayClick={onDayClick}
                  guardDayInformation={guardDayInformation(date)}
                />
              </Grid>
            );
          }
          if (daysInWeek === 5 && !isWeekend(index)) {
            return (
              <Grid item key={index} sx={{ m: 1 / 2 }}>
                <Day
                  date={date}
                  dayOfWeekText={getDayOfWeekText(index)}
                  onDayClick={onDayClick}
                  guardDayInformation={guardDayInformation(date)}
                />
              </Grid>
            );
          }
        })}
      </Grid>

      <BasicModal isOpen={isDayModalOpen} closeModal={handleCloseDayModal}>
        <DayModal closeModal={handleCloseDayModal} />
      </BasicModal>
    </>
  );
};
