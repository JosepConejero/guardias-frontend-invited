import { Grid, IconButton, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { UsersGuardsBoxItem } from "./UsersGuardsBoxItem";

const emptyTechnician = {
  technicianId: null,
  courseId: null, // estas dos podrían ser "", pero habría que borrar las entradas de la bda
  isInClientWorkplace: false,
  isProvisional: false,
  isCancelled: false,
};

export const UsersGuardsBox = () => {
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();

  const onAddTechnician = () => {
    if (guardDayOpened.technicians.length <= 3) {
      updateOpenedGuardDay({
        ...guardDayOpened,
        technicians: [...guardDayOpened.technicians, { ...emptyTechnician }],
      });
    }
  };

  const onDeleteItem = (index) => {
    //console.log("se borra la fila ", index);
    let newTechnicians = [...guardDayOpened.technicians];
    //console.log("newTechnicians antes de borrar", newTechnicians.length);
    newTechnicians.splice(index, 1);
    //console.log("newTechnicians después de borrar", newTechnicians.length);
    updateOpenedGuardDay({
      ...guardDayOpened,
      technicians: [...newTechnicians],
    });
  };

  return (
    <Stack sx={{ borderRadius: "5px", border: "1px grey solid", p: "10px" }}>
      <Grid container>
        <Grid
          item
          sx={{ mb: "3px", fontWeight: "bold" }}
          container
          /*   alignItems="center"
          justifyContent="center" */
        >
          <Grid
            item
            sx={{
              borderRadius: "5px",
              border: "1px grey solid",
              textAlign: "center",
              width: "100%",
              bgcolor: "gainsboro",
            }}
          >
            <IconButton onClick={onAddTechnician}>
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {guardDayOpened?.technicians.map((technician, index) => (
        <UsersGuardsBoxItem
          key={index}
          technician={technician}
          index={index}
          /* onLabelChange={onLabelChange} */
          onDeleteItem={onDeleteItem}
        />
      ))}
    </Stack>
  );
};
