import { CalendarMonth, LogoutOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuthStore } from "../../hooks";

//export const Navbar = ({ drawerWidth = 240 }) => {
export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${0}px)` },
        ml: { sm: `${0}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
          /* sx={{ mr: 2, display: { sm: "none" } }} */
        >
          {/* <MenuOutlined /> */}
          <CalendarMonth />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            Calendario de guardias - ({user.name})
          </Typography>
          <IconButton color="error" onClick={startLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
