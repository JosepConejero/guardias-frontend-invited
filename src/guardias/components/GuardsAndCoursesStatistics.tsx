import { Divider, Grid, Typography } from "@mui/material";
import { useStatisticsData } from "../../hooks/useStatisticsData";
//import { useAuthStore } from "../../hooks";

export const GuardsAndCoursesStatistics = (): JSX.Element => {
  const { guardsAndFlcsStatisticsSortedByShortName } = useStatisticsData();
  //const { user } = useAuthStore();

  return (
    <Grid
      container
      direction="column"
      sx={{
        border: "1px solid lightgrey",
        width: "100%",
        height: "auto",
        borderRadius: 1,
        p: 0.5,
        //visibility: user.canSeeStatistics ? "" : "hidden",
      }}
      alignItems="center"
    >
      <Grid
        item
        sx={{
          width: "100%",
          borderRadius: 2,
          p: 0.4,
        }}
      >
        <Grid container columns={14} direction="row">
          <Grid item xs={5} md={5}>
            <Grid
              container
              direction="row"
              alignItems="center"
              sx={{ pl: 0.5 }}
            >
              <Grid item>
                <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                  Técnico
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5} md={5}>
            <Grid
              container
              direction="row"
              alignItems="center"
              sx={{ px: 0.5 }}
            >
              <Grid item>
                <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                  Guardias
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              sx={{ px: 0.5 }}
            >
              <Grid item>
                <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                  Cursos
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider
        sx={{
          width: "100%",
          background: "lightgrey",
        }}
      />

      <Grid
        item
        sx={{
          width: "100%",
          p: 1,
        }}
      >
        {guardsAndFlcsStatisticsSortedByShortName.map((technician) => (
          <Grid
            container
            key={technician.technicianId}
            direction="row"
            columns={14}
          >
            <Grid item xs={5} md={5}>
              <Typography
                sx={{ fontSize: 14, fontWeight: "bold", color: "blue" }}
              >
                {technician.shortName}
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography sx={{ ml: 3.5, fontSize: 14 }}>
                {technician.totalGuards}
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography sx={{ ml: { md: 5, xs: 6.5 }, fontSize: 14 }}>
                {technician.totalFlcs}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
