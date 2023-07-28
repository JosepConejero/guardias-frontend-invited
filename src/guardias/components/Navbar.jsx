import { Link as RouterLink } from "react-router-dom";

import { /* CalendarMonth,  */ LogoutOutlined } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  AppBar,
  Grid,
  IconButton,
  ImageListItem,
  Toolbar,
  Typography,
} from "@mui/material";
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
        ml: { md: `${0}px` },
        pl: { md: "10px" },
        //zIndex: "800",
        //"& .MuiPaper-root": { zIndex: 800 },
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
          {/* <CalendarMonth /> */}
          <ImageListItem>
            <img src="/assets/logo-mpe.png" alt="logo de MPE"></img>
          </ImageListItem>
        </IconButton>

        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-end", md: "center" }}
          // sx={{ border: 1 }}
        >
          <Grid
            item
            sx={{
              /* border: 1 */
              mb: { xs: -1, md: 0 },
            }}
          >
            <Typography variant="h6" /* noWrap */ component="div">
              Calendario de guardias - {user.shortName}
            </Typography>
          </Grid>

          <Grid item sx={{ mr: { xs: -1.5, md: -1 } /* border: 1 */ }}>
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
