import { CalendarMonth, LogoutOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";

//export const Navbar = ({ drawerWidth = 240 }) => {
export const Navbar = () => {
  // const dispatch = useDispatch();
  const onLogout = () => {
    //console.log("logout");
    // dispatch(startLogout());
  };

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
            Calendario de guardias
          </Typography>
          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
