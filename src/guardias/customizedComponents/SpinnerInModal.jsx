import { CircularProgress, Grid, Typography } from "@mui/material";

export const SpinnerInModal = ({ text }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      //direction="column"
      //height="100vh"
      sx={{
        height: {
          xs: "720px",
          md: "708px",
        },
        width: "100%",
        bgcolor: "#f0f8ff",
      }}
    >
      <Grid item mt={15}>
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
          <Grid item sx={{ height: { xs: "180px", md: "180px" } }}>
            <CircularProgress />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
