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
import { PruebasEstadisticas } from "../components/PruebasEstadisticas";
import { MonthBox } from "../monthGuards/MonthBox";

export const GuardiasPage = () => {
  const { startLoadingGuardDays } = useCalendarStore();
  const { startLoadingAppUsers } = useAppUsersStore();
  const { startLoadingCourses } = useCoursesStore();

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
        spacing={0}
        alignItems="flex-start"
        justifyContent="center"
        sx={{
          minHeight: `100vh`,
          backgroundColor: "yellow",
          pt: 9,
        }}
      >
        <Grid
          item
          container
          sx={{
            width: { sm: 1300 },
            backgroundColor: "cyan",
            borderRadius: 2,
          }}
        >
          <Grid item md={2}>
            <PruebasEstadisticas />
          </Grid>
          <Grid item md={8}>
            <MonthBox />
          </Grid>
          <Grid item md={2}>
            <PruebasEstadisticas />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
