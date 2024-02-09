import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";

import { purpleTheme } from ".";

interface CommonProps {
  children?: ReactNode;
}

export const AppTheme = ({ children }: CommonProps): React.JSX.Element => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
