//import "../../styles.css";
import { Grid } from "@mui/material";
import { useState } from "react";

import { officeDate } from "../../helpers/myCalendar";
import { MonthControls } from "./MonthControls";
import { MonthDays } from "./MonthDays";

export const MonthBox = () => {
  const [showedDate, setShowDate] = useState(new Date());
  const [showedDays, setShowedDays] = useState(
    officeDate(showedDate.getFullYear(), showedDate.getMonth())
  );

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

  return (
    <>
      <Grid container sx={{ borderRadius: 2, bgcolor: "maroon" }}>
        <MonthControls
          onPreviousMonth={onPreviousMonth}
          onNextMonth={onNextMonth}
          showedDate={showedDate}
        />
        <MonthDays showedDays={showedDays} />
      </Grid>
    </>
  );
};
