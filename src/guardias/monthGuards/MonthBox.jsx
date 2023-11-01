/* eslint-disable react-hooks/exhaustive-deps */

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { officeDate } from "../../helpers/myCalendar";
import { MonthControls } from "./MonthControls";
import { MonthDays } from "./MonthDays";
import { useCalendarStore } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { onUpdateShowedDate } from "../../store/calendar/calendarSlice";

export const MonthBox = () => {
  const { showedDate } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [showedDays, setShowedDays] = useState(
    officeDate(showedDate.getFullYear(), showedDate.getMonth())
  );

  const { setShowedMonth } = useCalendarStore();

  const onPreviousMonth = () => {
    dispatch(
      onUpdateShowedDate(
        new Date(showedDate.getFullYear(), showedDate.getMonth() - 1)
      )
    );
    setShowedDays(() =>
      officeDate(showedDate.getFullYear(), showedDate.getMonth() - 1)
    );
  };

  const onNextMonth = () => {
    dispatch(
      onUpdateShowedDate(
        new Date(showedDate.getFullYear(), showedDate.getMonth() + 1)
      )
    );
    setShowedDays(() =>
      officeDate(showedDate.getFullYear(), showedDate.getMonth() + 1)
    );
  };

  useEffect(() => {
    setShowedMonth({
      year: showedDate.getFullYear(),
      month: showedDate.getMonth(),
    });
  }, [showedDate]);

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <MonthControls
            onPreviousMonth={onPreviousMonth}
            onNextMonth={onNextMonth}
            showedDate={showedDate}
          />
        </Grid>

        <Grid item>
          <MonthDays showedDays={showedDays} />
        </Grid>
      </Grid>
    </>
  );
};
