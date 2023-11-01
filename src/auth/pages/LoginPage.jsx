import { Link as RouterLink } from "react-router-dom";
import Google from "@mui/icons-material/Google";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import "../../styles.css";

import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore, useForm } from "../../hooks";
import { useEffect, useMemo } from "react";
import Swal from "sweetalert2";

const formFields = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { status, startLogin, errorMessage } = useAuthStore();
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const { email, password, onInputChange } = useForm(formFields);

  const onSubmit = (event) => {
    event.preventDefault();
    startLogin({ email, password });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <AuthLayout title="Login">
      <form
        aria-label="submit-form"
        onSubmit={onSubmit}
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
              value={email}
              onChange={onInputChange}
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
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} display="none">
              <Button variant="contained" fullWidth aria-label="google-btn">
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
