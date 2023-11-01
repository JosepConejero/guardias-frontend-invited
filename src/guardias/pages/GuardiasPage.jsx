/* eslint-disable react-hooks/exhaustive-deps */
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles.css";
import { Grid } from "@mui/material";

import { useEffect } from "react";
import {
  useAppUsersStore,
  useCalendarStore,
  useCoursesStore,
} from "../../hooks";
import { Navbar } from "../components/Navbar";
import { TechniciansOutStatistics } from "../components/TechniciansOutStatistics";
import { GuardsAndCoursesStatistics } from "../components/GuardsAndCoursesStatistics";
import { MonthBox } from "../monthGuards/MonthBox";
import { useSelector } from "react-redux";

export const GuardiasPage = () => {
  const { startLoadingGuardDays } = useCalendarStore();
  const { startLoadingAppUsers } = useAppUsersStore();
  const { startLoadingCourses } = useCoursesStore();

  const { showStatistics } = useSelector((state) => state.month);
  const { daysInWeek } = useSelector((state) => state.month);

  useEffect(() => {
    startLoadingAppUsers();
  }, []);

  useEffect(() => {
    startLoadingCourses();
  }, []);

  useEffect(() => {
    startLoadingGuardDays();
  }, []);

  return (
    <>
      <Navbar />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          pt: 9,
        }}
      >
        <Grid
          item
          container
          direction={{ xs: "column", md: "row" }}
          sx={{
            width: {
              md: showStatistics
                ? daysInWeek === 5
                  ? 1300
                  : 1450
                : daysInWeek === 5
                ? 867
                : 1050,
            },
          }}
        >
          <Grid
            item
            md={
              showStatistics
                ? daysInWeek === 5
                  ? 2
                  : 1.7
                : daysInWeek === 5
                ? 0
                : 0
            }
            sx={{ pt: { md: 5.5 } }}
          >
            {showStatistics && <TechniciansOutStatistics />}
          </Grid>

          <Grid
            sx={{ pb: 2.5 }}
            item
            md={
              showStatistics
                ? daysInWeek === 5
                  ? 8
                  : 8.6
                : daysInWeek === 5
                ? 12
                : 12
            }
          >
            <MonthBox />
          </Grid>

          <Grid
            item
            md={
              showStatistics
                ? daysInWeek === 5
                  ? 2
                  : 1.7
                : daysInWeek === 5
                ? 0
                : 0
            }
            sx={{ pt: { md: 5.5 } }}
          >
            {showStatistics && <GuardsAndCoursesStatistics />}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
