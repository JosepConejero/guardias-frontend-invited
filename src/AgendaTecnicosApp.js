import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import "./styles.css";
import { AppTheme } from "./theme";

function AgendaTecnicosApp() {
  return (
    <BrowserRouter>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </BrowserRouter>
  );
}

export default AgendaTecnicosApp;
