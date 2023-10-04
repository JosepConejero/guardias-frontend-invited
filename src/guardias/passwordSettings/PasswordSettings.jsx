import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { /* useAuthStore, */ useForm } from "../../hooks";
import Swal from "sweetalert2";

const formFields = {
  name: "",
  email: "",
  password0: "",
  password: "",
  password2: "",
};

const formValidations = {
  password0: [
    (value) => value.length >= 6,
    "El password debe tener como mínimo 6 letras",
  ],
  password: [
    (value) => value.length >= 6,
    "El password debe tener como mínimo 6 letras",
  ],
  password2: [
    (value) => value.length >= 6,
    "El password debe tener como mínimo 6 letras",
  ],
};

export const PasswordSettings = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  // const { startRegister, errorMessage } = useAuthStore();

  /*  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  ); */

  const {
    password0,
    password,
    password2,
    onInputChange,
    isFormValid,
    password0Valid,
    passwordValid,
    password2Valid,
  } = useForm(formFields, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    //TO DO: AQUÍ SE COMPROBARÁ QUE LA ANTERIOR CONTRASEÑA ES LA CORRECTA
    if (password !== password2) {
      Swal.fire(
        "Error en el password",
        "Las dos contraseñas nuevas son distintas",
        "error"
      );
      return;
    }
    if (!isFormValid) return;
    console.log("aquí se modificaría el password");
    //TO DO: aquí se modificará el password
    //startRegister({ name, email, password });
  };

  /*   useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]); */

  const passwordRestore = () => {
    //pregunta si está usted seguro
    console.log("restaura el password y vacía los text input");
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {/* <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="name"
              value={name}
              onChange={onInputChange}
              error={!!nameValid && formSubmitted}
              helperText={formSubmitted && nameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted && emailValid}
            />
          </Grid> */}

          <Grid item xs={12} sx={{ mt: 4 }}>
            <TextField
              label="Contraseña anterior"
              type="password"
              placeholder="Contraseña anterior"
              //fullWidth
              name="password0"
              value={password0}
              onChange={onInputChange}
              error={!!password0Valid && formSubmitted}
              helperText={formSubmitted && password0Valid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nueva contraseña"
              type="password"
              placeholder="Nueva contraseña"
              //fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted && passwordValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, mb: 4 }}>
            <TextField
              label="Repita la nueva contraseña"
              type="password"
              placeholder="Repita la nueva contraseña"
              //fullWidth
              name="password2"
              value={password2}
              onChange={onInputChange}
              error={!!password2Valid && formSubmitted}
              helperText={formSubmitted && password2Valid}
            />
          </Grid>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            /*  spacing={2} */ sx={{ mb: 4, mt: 1 }}
          >
            {/* <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid> */}
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Button
                //disabled={isCheckingAuthentication} //TO DO: QUE SE DESHABILITE EL BOTÓN
                type="submit"
                variant="contained"
                // fullWidth
              >
                Modificar contraseña
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" onClick={passwordRestore}>
                Restaurar contraseña
              </Button>
            </Grid>
          </Grid>

          {/*           <Button variant="outlined">Guarde la contraseña</Button> */}
        </Grid>
      </form>
    </>
  );
};
