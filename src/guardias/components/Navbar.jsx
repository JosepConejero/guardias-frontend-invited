import { Link as RouterLink } from "react-router-dom";

import { CalendarMonth, LogoutOutlined } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuthStore } from "../../hooks";
import { Link } from "@mui/material";

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

          <Grid item>
            <Link component={RouterLink} color="inherit" to="/guardias">
              <IconButton color="inherit">
                <CalendarMonthIcon />
              </IconButton>
            </Link>
            <Link component={RouterLink} color="inherit" to="/settings">
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
            </Link>
            <IconButton color="error" onClick={startLogout}>
              <LogoutOutlined />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
