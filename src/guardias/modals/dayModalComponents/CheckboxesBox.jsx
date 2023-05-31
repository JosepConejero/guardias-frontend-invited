/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useState } from "react";

export const CheckboxesBox = ({
  formValues,
  onInputChange,
  onCheckboxChangeFormValues,
}) => {
  const [isHolidayChecked, setIsHolidayChecked] = useState(
    formValues.isHoliday
  );
  const [isThereOffice2hChecked, setIsThereOffice2hChecked] = useState(
    formValues.isThereOffice2h
  );
  const [isThereExtraMeetingChecked, setIsThereExtraMeetingChecked] = useState(
    formValues.isThereExtraMeeting
  );

  /*   useEffect(() => {
    setIsHolidayChecked(formValues.isHoliday);
    setIsThereOffice2hChecked(formValues.isThereOffice2h);
    setIsThereExtraMeetingChecked(formValues.isThereExtraMeeting);
  }, []); */

  const onCheckboxChange = ({ target }) => {
    //console.log(target.checked);

    //console.log(target.name, target.checked);
    switch (target.name) {
      case "isHoliday":
        setIsHolidayChecked(target.checked);
        break;
      case "isThereOffice2h":
        setIsThereOffice2hChecked(target.checked);
        break;
      case "isThereExtraMeeting":
        setIsThereExtraMeetingChecked(target.checked);
        break;
      default:
        break;
    }
    onCheckboxChangeFormValues(target);
  };

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
      <Grid item md={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isHolidayChecked}
              name="isHoliday"
              onChange={onCheckboxChange}
            />
          }
          label="Es fiesta"
        />
      </Grid>
      <Grid item md={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isThereOffice2hChecked}
              name="isThereOffice2h"
              onChange={onCheckboxChange}
            />
          }
          label="Hay formación de 2 horas"
        />
      </Grid>

      <Grid item md={12}>
        <FormControlLabel
          sx={{ mb: 2 }}
          control={
            <Checkbox
              checked={isThereExtraMeetingChecked}
              name="isThereExtraMeeting"
              onChange={onCheckboxChange}
            />
          }
          label="Hay reunión extra"
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          sx={{ mb: 2 }}
          label="Tipo reunión"
          type="text"
          placeholder="Indique el tipo de reunión"
          name="extraMeetingText"
          fullWidth
          value={formValues.extraMeetingText}
          onChange={onInputChange}
        ></TextField>
      </Grid>
      <Grid item md={12}>
        <TextField
          sx={{ mb: 1 }}
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
