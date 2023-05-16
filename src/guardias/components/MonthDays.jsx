/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Grid } from "@mui/material";
import { Day } from "./Day";
import {
  isWeekend,
  isSunday,
  getDayOfWeekText,
} from "../../helpers/myCalendar";

import { useSelector } from "react-redux";
import { DayModal } from "./DayModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useEffect } from "react";

export const MonthDays = ({ showedDays }) => {
  const { openDayModal } = useUiStore();
  const { setActiveGuardDay, guardDayInformation } = useCalendarStore();

  const { daysInWeek } = useSelector((state) => state.month);

  const onDayClick = (day, month, year) => {
    setActiveGuardDay({ day, month, year });
    openDayModal();
  };

  /*  useEffect(() => {
    startLoadingGuardDays();
  }, []); */

  return (
    <Grid>
      <Grid
        container
        /*  justify-content="space-around" */
        columns={6}
        sx={{ bgcolor: "red", width: "auto" }}
      >
        {showedDays.map((date, index) => {
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
      <DayModal />
    </Grid>
  );
};
