import { Button, Grid, IconButton, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BasicMenu from "./BasicMenu";
import DeleteIcon from "@mui/icons-material/Delete";

export const UsersGuardsBox = () => {
  const onAddTechnician = () => {
    console.log("se añade un técnico");
  };
  const onDeleteItem = () => {
    console.log("se borra una fila");
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
      <Grid
        container
        flex-direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item md={1 + 1 / 2}>
          <BasicMenu name="técnico" />
        </Grid>
        <Grid item md={4}>
          <BasicMenu name="curso" />
        </Grid>
        <Grid item md={2}>
          <Button
            color="primary"
            disabled={false}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 5, height: "20px" }}
          >
            en oficina
          </Button>
        </Grid>
        <Grid item md={2}>
          <Button
            color="primary"
            disabled={false}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 5, height: "20px" }}
          >
            provisional
          </Button>
        </Grid>
        <Grid item md={2}>
          <Button
            color="primary"
            disabled={false}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 5, height: "20px" }}
          >
            cancelado
          </Button>
        </Grid>
        <Grid item md={1 / 2}>
          <IconButton onClick={onDeleteItem}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Stack>
  );
};
