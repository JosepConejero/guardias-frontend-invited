/* import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"; */
import { Link as RouterLink } from "react-router-dom";
import Google from "@mui/icons-material/Google";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import "../../styles.css";

import { AuthLayout } from "../layout/AuthLayout";

/* import { useForm } from "../../hooks";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth"; */

// esto lo ponemos fuera de LoginPage
// si lo ponemos dentro, da un error porque rerrenderiza esto de forma constante
const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  /*  const { status, errorMessage } = useSelector((state) => state.auth); //extraigo el status del auth del state

  const dispatch = useDispatch();

  const { email, password, onInputChange, formState } = useForm(formData);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log({ email, password });
    //! No es esta la acción a despachar
    //dispatch(checkingAuthentication());
    dispatch(startLoginWithEmailPassword(formState));
    //console.log("formState: ", formState);
  };

  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn");
    dispatch(startGoogleSignIn());
  }; */

  return (
    <AuthLayout title="Login">
      <form
        aria-label="submit-form"
        /* onSubmit={onSubmit} */
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              /*   value={email}
              onChange={onInputChange} */
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              inputProps={{ "data-testid": "password" }}
              name="password"
              /*   value={password}
              onChange={onInputChange} */
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert> */}
            <Grid item xs={12}>
              <Alert severity="error"></Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                /* disabled={isAuthenticating} */
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                /* disabled={isAuthenticating} */
                variant="contained"
                fullWidth
                aria-label="google-btn"
                /* onClick={onGoogleSignIn} */
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            {/* ESTE PRIMER LINK ES EL DE MATERIAL UI
              EL SEGUNDO LINK DE react-router-dom LO HE IMPORTADO Y RENOMBRADO COMO ROUTERLINK */}
            {/*  <Link component={RouterLink} color="inherit" to="/auth/register"> */}
            <Link component={RouterLink} color="inherit" to="/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
