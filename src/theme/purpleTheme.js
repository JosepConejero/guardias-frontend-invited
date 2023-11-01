import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary: {
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
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
          fontSize: 34,
        },
      },
    },
  },
});
