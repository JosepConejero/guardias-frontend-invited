import { Stack, Grid, IconButton, Typography } from "@mui/material";
import { monthNames } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  switchDaysInWeek,
  switchShowStatistics,
} from "../../store/month/monthSlice";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { RootState } from "../../store";

interface MonthControlsProps {
  onNextMonth: () => void;
  onPreviousMonth: () => void;
  showedDate: Date;
}

export const MonthControls = ({
  onNextMonth,
  onPreviousMonth,
  showedDate,
}: MonthControlsProps): JSX.Element => {
  const { daysInWeek }: { daysInWeek: number } = useSelector(
    (state: RootState) => state.month
  );

  const dispatch = useDispatch();

  const onClickFiveOrSevenDays = (): void => {
    dispatch(switchDaysInWeek());
  };

  const onShowStatistics = (): void => {
    dispatch(switchShowStatistics());
  };

  return (
    <Grid container direction="row">
      <Grid item xs={0} md={2}></Grid>

      <Grid item xs={10} md={8} sx={{ ml: { xs: -1.5, md: 0 } }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Grid>
            <IconButton onClick={onPreviousMonth}>
              <ArrowBackIosRoundedIcon />
            </IconButton>
          </Grid>

          <Grid sx={{ minWidth: 200, textAlign: "center" }}>
            <Typography variant="h5">
              {monthNames[showedDate.getMonth()]} {showedDate.getFullYear()}
            </Typography>
          </Grid>

          <Grid>
            <IconButton onClick={onNextMonth}>
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Grid>
        </Stack>
      </Grid>

      <Grid item xs={2} md={2}>
        <Stack direction="row" justifyContent="flex-end" sx={{ border: 0 }}>
          <IconButton onClick={onClickFiveOrSevenDays}>
            {daysInWeek === 6 ? (
              <CalendarViewWeekIcon />
            ) : (
              <CalendarViewMonthIcon />
            )}
          </IconButton>
          {
            <IconButton
              sx={{ mr: { xs: 1, md: 0 } }}
              onClick={onShowStatistics}
            >
              <AssessmentIcon />
            </IconButton>
          }
        </Stack>
      </Grid>
    </Grid>
  );
};
