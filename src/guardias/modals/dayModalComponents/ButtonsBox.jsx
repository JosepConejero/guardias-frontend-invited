import { Button, Grid } from "@mui/material";

export const ButtonsBox = ({ /*  isSaving, */ onCloseModal }) => {
  return (
    <Grid container justifyContent="center" spacing={5}>
      <Grid item>
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
            mr: 2,
          }}
        >
          CANCELAR
        </Button>
      </Grid>
      <Grid item>
        <Button
          //disabled={isSaving}
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
