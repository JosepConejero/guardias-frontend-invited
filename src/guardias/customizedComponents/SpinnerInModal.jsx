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
          xs: "680px", //xs: "680px", //xs: "720px",
          md: "680px", //md: "500px", //md: "708px",
        },
        width: { xs: "400px", md: "680px" }, //width: { xs: "calc(100vw - 40px)", md: "100%" }, //width: { xs: "calc(100vw - 20px)", md: "100%" },

        //bgcolor: "#f0f8ff",
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
