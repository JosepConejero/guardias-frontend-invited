import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useAuthStore, useForm } from "../../hooks";
import Swal from "sweetalert2";

const formFields = {
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
  const { updatePassword, user } = useAuthStore();
  const {
    password0,
    password,
    password2,
    onInputChange,
    isFormValid,
    password0Valid,
    passwordValid,
    password2Valid,
    onResetForm,
  } = useForm(formFields, formValidations);

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    try {
      if (password !== password2) {
        Swal.fire(
          "Error en el password",
          "Las dos contraseñas nuevas son distintas",
          "error"
        );
        return;
      }
      if (!isFormValid) {
        return;
      }
      console.log({ user });
      if (!user.email) {
        console.log("no existe user.email");
        return;
      }
      const data = await updatePassword({
        email: user.email,
        password: password0,
        password2: password,
      });
      if (!data.ok) {
        Swal.fire({
          title: "Error al cambiar la contraseña",
          text: data.msg,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: data.msg,
          icon: "info",
        });
      }
      onResetForm();
    } catch (error) {
      Swal.fire({
        title: "Error a la hora de cambiar la contraseña",
        text: "Por favor, verifique que la contraseña anterior sea correcta",
        icon: "error",
      });
    }

    setFormSubmitted(false);
  };

  const passwordRestore = async () => {
    //pregunta si está usted seguro
    try {
      const data = await updatePassword({
        id: user.uid,
      });
      if (!data.ok) {
        Swal.fire({
          title: "Error al restaurar la contraseña",
          text: data.msg,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Contraseña restaurada correctamente",
          text: "Acuérdese de cambiarla",
          icon: "info",
        });
      }
      onResetForm();
    } catch (error) {
      Swal.fire({
        title: "Error a la hora de restaurar la contraseña",

        icon: "error",
      });
    }
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
