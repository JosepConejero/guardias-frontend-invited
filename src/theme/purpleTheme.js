import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

// A custom theme for this app
export const purpleTheme = createTheme({
  palette: {
    primary: {
      //main: "#262254",
      main: "#0000E0",
    },
    secondary: {
      main: "#543884",
    },
    error: {
      main: red.A400,
    },
    normalText: {
      main: "#333333",
    },
    markedText: {
      main: "#0040ff",
    },
    flcRelated: {
      main: "#ff0000",
    },
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        //disableRipple: true,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperFullScreen: red,
      },
    },
  },
});
