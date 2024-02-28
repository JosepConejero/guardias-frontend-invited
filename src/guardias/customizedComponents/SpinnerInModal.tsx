import { CircularProgress, Grid, Typography } from "@mui/material";

export const SpinnerInModal = ({ text }: { text: string }): JSX.Element => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        height: {
          xs: "680px",
          md: "680px",
        },
        width: { xs: "400px", md: "680px" },
      }}
    >
      <Grid item>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
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
      </Grid>
    </Grid>
  );
};
