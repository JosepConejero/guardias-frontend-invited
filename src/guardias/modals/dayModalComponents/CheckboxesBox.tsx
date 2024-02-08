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
import { useAuthStore } from "../../../hooks";

export const CheckboxesBox = () => {
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();
  const { user } = useAuthStore();

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
  };

  return (
    <Stack
      sx={{
        borderRadius: "5px",
        border: "1px grey solid",
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
                disabled={!user.isDataModifier}
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
                disabled={!user.isDataModifier}
              />
            }
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
                disabled={!user.isDataModifier}
              />
            }
            label={
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Hay reunión extra
              </Typography>
            }
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <TextField
            disabled={!isThereExtraMeetingChecked || !user.isDataModifier}
            sx={{ mb: 2 }}
            label="Tipo reunión"
            type="text"
            placeholder="Indique el tipo de reunión"
            name="extraMeetingText"
            fullWidth
            value={guardDayOpened.extraMeetingText}
            onChange={onInputChange}
            size="medium"
          />
        </Grid>
      </Grid>

      <Grid container>
        <TextField
          multiline
          rows={3}
          sx={{ mb: 1 }}
          label="Notas"
          type="text"
          placeholder="Anote algo aquí"
          fullWidth
          name="note"
          value={guardDayOpened.note}
          onChange={onInputChange}
          size="small"
          disabled={!user.isDataModifier}
        />
      </Grid>
    </Stack>
  );
};
