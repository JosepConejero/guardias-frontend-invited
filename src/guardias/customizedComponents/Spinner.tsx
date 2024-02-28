import { CircularProgress, Grid, Typography } from "@mui/material";

export const Spinner = ({ text }: { text: string }): JSX.Element => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{ height: "100vh", bgcolor: "#f0f8ff" }}
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
