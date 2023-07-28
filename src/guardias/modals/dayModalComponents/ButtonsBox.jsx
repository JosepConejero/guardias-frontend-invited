import { Button, Grid } from "@mui/material";

export const ButtonsBox = ({ onCloseModal }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      //height="50px"
      /* spacing={5} */
      //sx={{ mt: 3 }}
    >
      <Grid item /* md={6} */>
        <Button
          //disabled={isSaving}
          onClick={onCloseModal}
          variant="contained"
          //fullWidth
          sx={{
            bgcolor: "#AB0000",
            "&:hover": {
              backgroundColor: "#800000",
            },
            mr: { xs: 3, md: 5 },
            mt: 1,
          }}
        >
          CANCELAR
        </Button>
      </Grid>
      <Grid item /* md={6} */>
        <Button
          //disabled={isSaving}
          type="submit"
          variant="contained"
          //fullWidth
          sx={{ mt: 1 }}
        >
          GUARDAR
        </Button>
      </Grid>
    </Grid>
  );
};
