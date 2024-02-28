import { Button, Grid } from "@mui/material";

interface ButtonsBoxProps {
  onCloseModal: () => void;
  cancelDisabled?: boolean;
  okDisabled?: boolean;
}

export const ButtonsBox = ({
  onCloseModal,
  cancelDisabled = false,
  okDisabled = false,
}: ButtonsBoxProps): JSX.Element => {
  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item>
        <Button
          disabled={cancelDisabled}
          onClick={onCloseModal}
          variant="contained"
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
      <Grid item>
        <Button
          disabled={okDisabled}
          type="submit"
          variant="contained"
          sx={{ mt: 1 }}
        >
          GUARDAR
        </Button>
      </Grid>
    </Grid>
  );
};
