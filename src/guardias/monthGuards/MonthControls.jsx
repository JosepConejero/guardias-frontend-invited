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
import { useAuthStore } from "../../hooks";

export const MonthControls = ({ onNextMonth, onPreviousMonth, showedDate }) => {
  /*  const [lastView, setLastView] = useState(
    localStorage.getItem("lastItem") || ""
  ); */ //se usa el || '' pq puede ser null cn se carga la 1ª vez

  const { daysInWeek } = useSelector((state) => state.month);
  const { user } = useAuthStore();
  const dispatch = useDispatch();

  const onClickFiveOrSevenDays = () => {
    dispatch(switchDaysInWeek());
  };

  const onShowStatistics = () => {
    dispatch(switchShowStatistics());
  };

  return (
    <Grid container direction="row">
      <Grid item md={2}></Grid>

      <Grid item md={8}>
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

      <Grid item md={2}>
        <Stack direction="row" justifyContent="flex-end" sx={{ border: 0 }}>
          <IconButton onClick={onClickFiveOrSevenDays}>
            {daysInWeek === 6 ? (
              <CalendarViewWeekIcon />
            ) : (
              <CalendarViewMonthIcon />
            )}
          </IconButton>
          {user.canSeeStatistics && (
            <IconButton onClick={onShowStatistics}>
              <AssessmentIcon />
            </IconButton>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};
