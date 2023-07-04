/* eslint-disable react-hooks/exhaustive-deps */
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCheckboxes } from "../../../hooks/useCheckboxes";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";

export const CheckboxesBox = (/* {
  formValuesCheckbox,
  formValuesTextField,
  onInputChange,
  onCheckboxChangeFormValues,
} */) => {
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();
  /* const [isHolidayChecked, setCheckedCheckboxisHoliday] = useState(
    formValues.isHoliday
  );
  const onHandleClickIsHoliday = () => {
    setCheckedCheckboxisHoliday(!isHolidayChecked);
  }; */

  /* const onInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onCheckboxChangeFormValues = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.checked });
  }; */

  /*   const {
    checkedCheckbox: isHolidayChecked,
    onHandleClick: onHandleClickIsHoliday,
  } = useCheckboxes(formValuesCheckbox.isHoliday);
  const {
    checkedCheckbox: isThereOffice2hChecked,
    onHandleClick: onHandleClickIsThereOffice2h,
  } = useCheckboxes(formValuesCheckbox.isThereOffice2h);
  const {
    checkedCheckbox: isThereExtraMeetingChecked,
    onHandleClick: onHandleClickIsThereExtraMeeting,
  } = useCheckboxes(formValuesCheckbox.isThereExtraMeeting); */
  const {
    checkedCheckbox: isHolidayChecked,
    onHandleClick: onHandleClickIsHoliday,
  } = useCheckboxes(guardDayOpened.isHoliday);
  const {
    checkedCheckbox: isThereOffice2hChecked,
    onHandleClick: onHandleClickIsThereOffice2h,
  } = useCheckboxes(guardDayOpened.isThereOffice2h);
  const {
    checkedCheckbox: isThereExtraMeetingChecked,
    onHandleClick: onHandleClickIsThereExtraMeeting,
  } = useCheckboxes(guardDayOpened.isThereExtraMeeting);

  const onCheckboxChangeFormValues = ({ target }) => {
    updateOpenedGuardDay({ ...guardDayOpened, [target.name]: target.checked });
  };

  const onInputChange = ({ target }) => {
    updateOpenedGuardDay({ ...guardDayOpened, [target.name]: target.value });
    //setFormValues({ ...formValues, [target.name]: target.value });
  };

  return (
    <Stack
      sx={{
        //flexDirection: "column",
        borderRadius: "5px",
        border: "1px grey solid",
        //width: { xs: "100%", md: "auto" },
        // width: { xs: "100%", md: "100%" },
        //width: "500px",
      }}
      p={1}
    >
      <Grid container direction="row" mb={1}>
        <Grid item xs={12} md={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isHolidayChecked}
                name="isHoliday"
                onClick={onHandleClickIsHoliday}
                onChange={onCheckboxChangeFormValues}
              />
            }
            label={
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Es fiesta
              </Typography>
            }
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isThereOffice2hChecked}
                name="isThereOffice2h"
                onClick={onHandleClickIsThereOffice2h}
                onChange={onCheckboxChangeFormValues}
              />
            }
            //label="Hay formación de 2 horas"
            label={
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Hay formación de 2 horas
              </Typography>
            }
          />
        </Grid>
      </Grid>

      <Grid container direction="row" alignItems="center">
        <Grid item xs={12} md={3}>
          <FormControlLabel
            sx={{ mb: 2 }}
            control={
              <Checkbox
                checked={isThereExtraMeetingChecked}
                name="isThereExtraMeeting"
                onClick={onHandleClickIsThereExtraMeeting}
                onChange={onCheckboxChangeFormValues}
              />
            }
            //label="Hay reunión extra"
            label={
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Hay reunión extra
              </Typography>
            }
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <TextField
            disabled={!isThereExtraMeetingChecked}
            sx={{ mb: 2 }}
            label="Tipo reunión"
            type="text"
            placeholder="Indique el tipo de reunión"
            name="extraMeetingText"
            fullWidth
            //  value={formValuesTextField.extraMeetingText}
            value={guardDayOpened.extraMeetingText}
            onChange={onInputChange}
            size="medium"
          />
        </Grid>
      </Grid>

      <Grid container>
        <TextField
          multiline
          rows={4}
          sx={{ mb: 1 }}
          label="Notas"
          type="text"
          placeholder="Anote algo aquí"
          fullWidth
          name="note"
          //  value={formValuesTextField.note}
          value={guardDayOpened.note}
          onChange={onInputChange}
          size="medium"
        />
      </Grid>
    </Stack>
  );
};
