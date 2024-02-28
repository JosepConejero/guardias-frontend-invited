import { Provider } from "react-redux";
import { store } from "./store";

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { AppTheme } from "./theme";

import "./styles.css";

function AgendaTecnicosApp(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </BrowserRouter>
    </Provider>
  );
}

export default AgendaTecnicosApp;
