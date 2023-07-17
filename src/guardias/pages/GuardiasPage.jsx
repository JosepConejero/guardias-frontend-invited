/* eslint-disable react-hooks/exhaustive-deps */
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles.css";
import { Grid } from "@mui/material";

import { useEffect } from "react";
import {
  useAppUsersStore,
  useAuthStore,
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
  const { user } = useAuthStore();
  const { showStatistics } = useSelector((state) => state.month);

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
        //spacing={0}
        //alignItems="flex-start"
        alignItems="center"
        justifyContent="center"
        sx={{
          //minHeight: `100vh`,
          /* backgroundColor: "yellow", */
          pt: 9,
        }}
      >
        <Grid
          item
          container
          sx={{
            width: {
              sm: user.canSeeStatistics && showStatistics ? 1300 : 867,
            },
            // maxWidth: { sm: 1300 },
            /*   backgroundColor: "cyan", */
            /*  borderRadius: 2, */
          }}
        >
          <Grid item md={user.canSeeStatistics && showStatistics ? 2 : 0}>
            {user.canSeeStatistics && showStatistics && (
              <TechniciansOutStatistics />
            )}
          </Grid>
          <Grid item md={user.canSeeStatistics && showStatistics ? 8 : 12}>
            <MonthBox />
          </Grid>
          <Grid item md={user.canSeeStatistics && showStatistics ? 2 : 0}>
            {user.canSeeStatistics && showStatistics && (
              <GuardsAndCoursesStatistics />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
