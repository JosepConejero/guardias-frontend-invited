import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";

export const CheckboxesBox = () => {
  return (
    <Grid
      sx={{
        /* display: { xs: "none", md: "flex" }, */
        /* bgcolor: "cyan", */
        flexDirection: "column",
        borderRadius: "5px",
        border: "1px grey solid",
        width: { xs: "100%", md: "auto" },
        /* width: { xs: "100%", md: "100%" }, */
      }}
      container
      p={1}
    >
      <Grid item md={12} /* zeroMinWidth */>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Es fiesta"
          /* noWrap */
        />
      </Grid>

      <Grid item md={12} /* zeroMinWidth */>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Hay reunión extra"
          /* noWrap */
        />
      </Grid>
      <Grid item md={12} /* zeroMinWidth */>
        <TextField
          sx={{ width: "100%", mb: 1 }}
          label="Tipo reunión" /* noWrap */
        ></TextField>
      </Grid>
      <Grid item md={12} /* zeroMinWidth */>
        <TextField sx={{ width: "100%" }} label="Nota" /* noWrap */></TextField>

        <TextField
          label="Notas"
          type="text"
          placeholder="Anote algo aquí"
          fullWidth
          name="note"
          value={formValues.note}
          onChange={onInputChange}
        />
      </Grid>
    </Grid>
  );
};
