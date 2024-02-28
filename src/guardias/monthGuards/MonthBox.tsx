/* eslint-disable react-hooks/exhaustive-deps */

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { officeDate } from "../../helpers/myCalendar";
import { MonthControls } from "./MonthControls";
import { MonthDays } from "./MonthDays";
import { useCalendarStore } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { onUpdateShowedDate } from "../../store/calendar/calendarSlice";
import { RootState } from "../../store";
import { SimpleDate } from "../../interfaces";

export const MonthBox = (): JSX.Element => {
  const { showedDate }: { showedDate: Date } = useSelector(
    (state: RootState) => state.calendar
  );
  const dispatch = useDispatch();

  const [showedDays, setShowedDays] = useState<SimpleDate[]>(
    officeDate(showedDate.getFullYear(), showedDate.getMonth())
  );

  const { setShowedMonth } = useCalendarStore();

  const onPreviousMonth = (): void => {
    dispatch(
      onUpdateShowedDate(
        new Date(showedDate.getFullYear(), showedDate.getMonth() - 1)
      )
    );
    setShowedDays(() =>
      officeDate(showedDate.getFullYear(), showedDate.getMonth() - 1)
    );
  };

  const onNextMonth = (): void => {
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
