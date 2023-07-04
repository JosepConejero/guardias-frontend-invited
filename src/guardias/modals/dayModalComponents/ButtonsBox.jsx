import { Button, Grid } from "@mui/material";

export const ButtonsBox = ({ onCloseModal }) => {
  return (
    <Grid container justifyContent="center" spacing={5}>
      <Grid item>
        <Button
          /* disabled={isAuthenticating} */
          onClick={onCloseModal}
          variant="contained"
          //fullWidth
          sx={{
            bgcolor: "#AB0000",
            "&:hover": {
              backgroundColor: "#800000",
            },
          }}
        >
          CANCELAR
        </Button>
      </Grid>
      <Grid item>
        <Button
          /* disabled={isAuthenticating} */
          type="submit"
          variant="contained"
          //fullWidth
        >
          GUARDAR
        </Button>
      </Grid>
    </Grid>
  );
};
