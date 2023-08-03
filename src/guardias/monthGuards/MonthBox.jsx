/* eslint-disable react-hooks/exhaustive-deps */
//import "../../styles.css";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { officeDate } from "../../helpers/myCalendar";
import { MonthControls } from "./MonthControls";
import { MonthDays } from "./MonthDays";
import { useCalendarStore } from "../../hooks";
//import { useDispatch /*  useSelector */ } from "react-redux";
//import { onSetShowedMonth } from "../../store";

export const MonthBox = () => {
  const [showedDate, setShowDate] = useState(new Date());
  const [showedDays, setShowedDays] = useState(
    officeDate(showedDate.getFullYear(), showedDate.getMonth())
  );
  //const {showedMonth} = useSelector((state) => state.calendar);
  //const dispatch = useDispatch();
  //dispatch(onSetShowedMonth(23));
  const { setShowedMonth } = useCalendarStore();
  //console.log(showedDate.getFullYear(), showedDate.getMonth());

  const onPreviousMonth = () => {
    setShowDate(
      () => new Date(showedDate.getFullYear(), showedDate.getMonth() - 1)
    );
    setShowedDays(() =>
      officeDate(showedDate.getFullYear(), showedDate.getMonth() - 1)
    );
  };

  const onNextMonth = () => {
    setShowDate(
      () => new Date(showedDate.getFullYear(), showedDate.getMonth() + 1)
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
    //console.log(showedDate.getFullYear(), showedDate.getMonth());
  }, [showedDate]);

  return (
    <>
      <Grid
        container
        direction="column" /* sx={{ bgcolor: "green", border: 0 }} */
      >
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
