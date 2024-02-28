import { Grid, Typography } from "@mui/material";
import { dayOfWeekByYearMonthDay, monthNames } from "../../../helpers";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { EventGuardDay, SimpleDate } from "../../../interfaces";

export const DateBox = (): JSX.Element => {
  // const {
  //   guardDayOpened: {
  //     simpleDate: { year, month, day },
  //   },
  // } = useGuardDayStore();

  const { guardDayOpened }: { guardDayOpened: EventGuardDay | null } =
    useGuardDayStore();
  const { year, month, day }: SimpleDate = guardDayOpened!.simpleDate;
  return (
    <Grid item>
      <Typography
        sx={{
          fontSize: { xs: "18px", md: "32px" },
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
