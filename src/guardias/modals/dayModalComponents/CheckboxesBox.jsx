/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useCheckboxes } from "../../../hooks/useCheckboxes";
import { useEffect, useState } from "react";

export const CheckboxesBox = ({
  formValues,
  onInputChange,
  onCheckboxChangeFormValues,
}) => {
  //console.log(formValues);

  const [isHolidayChecked, setCheckedCheckboxisHoliday] = useState(
    formValues.isHoliday
  );
  const onHandleClickIsHoliday = () => {
    setCheckedCheckboxisHoliday(!isHolidayChecked);
  };
  //console.log("formValues 1 dentro del checkboxesbox: ", formValues);
  /* const {
    checkedCheckbox: isHolidayChecked,
    onHandleClick: onHandleClickIsHoliday,
  } = useCheckboxes(formValues.isHoliday); */
  const {
    checkedCheckbox: isThereOffice2hChecked,
    onHandleClick: onHandleClickIsThereOffice2h,
  } = useCheckboxes(formValues.isThereOffice2h);
  const {
    checkedCheckbox: isThereExtraMeetingChecked,
    onHandleClick: onHandleClickIsThereExtraMeeting,
  } = useCheckboxes(formValues.isThereExtraMeeting);
  //console.log("formValues 2 dentro del checkboxesbox: ", formValues);

  useEffect(() => {
    /*    setCheckedCheckboxisHoliday(formValues.isHoliday); */
  }, []);

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
              /*  onChange={onCheckboxChange} */
              onClick={onHandleClickIsHoliday}
              onChange={onCheckboxChangeFormValues}
              value={formValues.isHoliday}
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
              /* onChange={onCheckboxChange} */
              onClick={onHandleClickIsThereOffice2h}
              onChange={onCheckboxChangeFormValues}
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
              /* onChange={onCheckboxChange} */
              onClick={onHandleClickIsThereExtraMeeting}
              onChange={onCheckboxChangeFormValues}
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
