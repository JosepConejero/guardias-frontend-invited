import { Divider, Grid, Typography } from "@mui/material";
import { useStatisticsData } from "../../hooks/useStatisticsData";
import { uniqueKey } from "../../helpers/uniqueKey";

export const TechniciansOutStatistics = () => {
  const { absencesStatistics } = useStatisticsData();

  return (
    <Grid
      container
      sx={{
        border: 1,
        borderRadius: 2,
        p: 1,
      }}
    >
      <Grid item>
        {/* cabecera */}
        <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 1 }}>
          Ausencias
        </Typography>
      </Grid>
      <Divider
        sx={{
          width: "100%",
          background: "lightgrey",
          //border: 2,
        }}
      />
      <Grid item sx={{ mt: 1 / 2, mb: 2 }}>
        {/* datos */}
        {absencesStatistics?.map((weekData) => (
          <>
            {weekData?.techniciansOut.length > 0 && (
              <Typography
                key={uniqueKey()}
                sx={{
                  fontSize: 14,
                  mb: 0,
                  color: "red",
                  fontWeight: "bold",
                  border: 1,
                  borderRadius: 1,
                  pl: 1 / 2,
                  mt: 1,
                }}
              >
                {weekData?.techniciansOut.length > 0
                  ? weekData?.week.join(", ")
                  : ""}
              </Typography>
            )}

            {weekData?.techniciansOut.map((technician) => (
              <Typography
                key={uniqueKey()}
                sx={{ fontSize: 14, ml: 1 + 1 / 2 }}
              >
                <span style={{ fontWeight: "bold", color: "blue" }}>
                  {technician.name}
                </span>
                :&nbsp;{technician.days}
              </Typography>
            ))}
          </>
        ))}
      </Grid>
    </Grid>
  );
};
