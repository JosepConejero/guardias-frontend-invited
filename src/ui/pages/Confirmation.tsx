import { Grid, Typography, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { ConfirmationProps } from "../../interfaces";

export function Confirmation({
  question,
  open,
  handleClose,
}: ConfirmationProps): JSX.Element {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid container direction="column">
          <Grid item>
            <Typography sx={{ m: 3 }}>{question}</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Button onClick={() => handleClose(false)} autoFocus>
                NO
              </Button>
              <Button onClick={() => handleClose(true)}>SÍ</Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
