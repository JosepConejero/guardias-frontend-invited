import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles.css";
import { Grid } from "@mui/material";

import { Navbar, MonthBox, PruebasEstadisticas } from "../components";

/* const events = [
  {
    title: "título",
    notas: "notas",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "@fafafa",
    user: {
      _id: "123",
      name: "Fernando",
    },
  },
]; */

export const GuardiasPage = () => {
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
