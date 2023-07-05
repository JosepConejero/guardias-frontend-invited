import { CircularProgress, Grid, Typography } from "@mui/material";

export const SpinnerInModal = ({ text }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: "#f0f8ff",
      }}
    >
      <Grid item mb={2}>
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          {text}
        </Typography>
      </Grid>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};
