import { Grid, IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { UsersGuardsBoxItem } from "./UsersGuardsBoxItem";
import { uniqueKey } from "../../../helpers/uniqueKey";
import { useAuthStore } from "../../../hooks";

const emptyTechnician = {
  technicianId: null,
  courseId: null,
  isInClientWorkplace: false,
  uniqueId: "",
};

export const UsersGuardsBox = () => {
  const {
    guardDayOpened,
    updateOpenedGuardDay,
    deleteTechnicianOpenedGuardDay,
  } = useGuardDayStore();
  const { user } = useAuthStore();

  const onAddTechnician = () => {
    if (guardDayOpened.technicians.length <= 5) {
      updateOpenedGuardDay({
        ...guardDayOpened,
        technicians: [
          ...guardDayOpened.technicians,
          { ...emptyTechnician, uniqueId: uniqueKey() },
        ],
      });
    }
  };

  const onDeleteItem = (uniqueId) => {
    deleteTechnicianOpenedGuardDay(uniqueId);
  };

  return (
    <Stack
      sx={{
        borderRadius: "5px",
        border: "1px grey solid",
        p: "10px",
      }}
    >
      <Grid container>
        <Grid item sx={{ mb: "3px", fontWeight: "bold" }} container>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              borderRadius: "5px",
              border: "1px grey solid",
              bgcolor: "gainsboro",
            }}
            item
          >
            <Grid>
              <Typography sx={{ fontWeight: "bold", mr: 1, fontSize: "16px" }}>
                Añadir técnico / formador
              </Typography>
            </Grid>
            <IconButton
              sx={{ color: "blue" }}
              onClick={onAddTechnician}
              disabled={!user.isDataModifier}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {guardDayOpened?.technicians.map((technician, index) => (
        <UsersGuardsBoxItem
          key={technician.uniqueId}
          technician={technician}
          index={index}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </Stack>
  );
};
