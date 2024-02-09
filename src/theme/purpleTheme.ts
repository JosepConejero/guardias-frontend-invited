import { createTheme } from "@mui/material";
//import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  /*   interface Theme {
    palette: {
      normalText: {
        main: string;
      };
    };
  } */
  interface PaletteOptions {
    normalText?: {
      main?: string;
    };
    markedText?: {
      main?: string;
    };
    flcRelated?: {
      main?: string;
    };
  }

  interface Components {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: string;
          fontSize: number;
        };
      };
    };
  }
}

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
