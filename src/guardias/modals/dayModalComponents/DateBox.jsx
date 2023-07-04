import { Grid, Typography } from "@mui/material";
import { dayOfWeekByYearMonthDay, monthNames } from "../../../helpers";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";

export const DateBox = () => {
  const {
    guardDayOpened: {
      simpleDate: { year, month, day },
    },
  } = useGuardDayStore();
  return (
    <Grid item>
      <Typography
        sx={{
          fontSize: "32px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {dayOfWeekByYearMonthDay(year, month, day)},&nbsp;{day}&nbsp;de&nbsp;
        {monthNames[month].toLowerCase()}&nbsp;de&nbsp;{year}
      </Typography>
    </Grid>
  );
};
