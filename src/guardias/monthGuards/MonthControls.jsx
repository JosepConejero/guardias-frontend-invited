import { Grid, IconButton, Typography } from "@mui/material";
import { monthNames } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { switchDaysInWeek } from "../../store/month/monthSlice";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useEffect } from "react";
//import { useState } from "react";

export const MonthControls = ({ onNextMonth, onPreviousMonth, showedDate }) => {
  /*  const [lastView, setLastView] = useState(
    localStorage.getItem("lastItem") || ""
  ); */ //se usa el || '' pq puede ser null cn se carga la 1ª vez

  const { daysInWeek } = useSelector((state) => state.month);
  const dispatch = useDispatch();

  const onClickFiveOrSevenDays = () => {
    dispatch(switchDaysInWeek());
  };

  const onShowStatistics = () => {
    console.log("shows/hides statistics");
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      sx={{ bgcolor: "green", borderRadius: 2 }}
    >
      <Grid item md={3}></Grid>
      <Grid
        container
        item
        direction="row"
        alignItems="center"
        justifyContent="center"
        md={6}
        sx={{ bgcolor: "gold", borderRadius: 2 }}
      >
        <Grid item sx={{ border: 1, textAlign: "right" }}>
          <IconButton onClick={onPreviousMonth}>
            <ArrowBackIosRoundedIcon />
          </IconButton>
        </Grid>

        <Grid item sx={{ border: 1, minWidth: 200, textAlign: "center" }}>
          <Typography variant="h5">
            {monthNames[showedDate.getMonth()]} {showedDate.getFullYear()}
          </Typography>
        </Grid>

        <Grid item sx={{ border: 1, textAlign: "left" }}>
          <IconButton onClick={onNextMonth}>
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item md={3}>
        <Grid sx={{ textAlign: "right", mr: 1 }}>
          {/* <Button
            variant="contained"
            size="small"
            onClick={onClickFiveOrSevenDays}
          >
            {daysInWeek === 6 ? "Sin sábados" : "Con sábados"}
          </Button> */}

          <IconButton onClick={onClickFiveOrSevenDays}>
            {daysInWeek === 6 ? (
              <CalendarViewWeekIcon />
            ) : (
              <CalendarViewMonthIcon />
            )}
          </IconButton>
          <IconButton onClick={onShowStatistics}>
            <AssessmentIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
