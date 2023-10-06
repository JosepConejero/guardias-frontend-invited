import { Button, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useAppUsersStore, useAuthStore, useForm } from "../../hooks";
import Swal from "sweetalert2";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch, useSelector } from "react-redux";
import { switchShowRestoreAllUsersButton } from "../../store/month/monthSlice";

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
  //const [showRestoreButtons, setShowRestoreButtons] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { updatePassword, startRestoringPassword, user } = useAuthStore();
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
  const { appUsers } = useAppUsersStore();
  const { showRestoreAllUsersButton } = useSelector((state) => state.month);

  const dispatch = useDispatch();

  const showRestoreButtons = () => {
    dispatch(switchShowRestoreAllUsersButton());
  };

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
      // console.log({ user });
      // if (!user.email) {
      //   console.log("no existe user.email");
      //   return;
      // }
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

  const restorePassword = async () => {
    //pregunta si está usted seguro
    //setFormSubmitted(true);
    setFormSubmitted(false);

    const id = user.uid;

    try {
      const data = await startRestoringPassword({
        id,
      });
      //console.log(data);
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
    //setFormSubmitted(false);
  };

  // const showUsersForRestorePasswords = () => {
  //   setShowRestoreButtons((previous) => !previous);

  //   //setShowRestoreButtons(() => !showRestoreButtons);
  // };

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

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
              sx={{ width: "300px" }}
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
              sx={{ width: "300px" }}
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
              sx={{ width: "300px" }}
            />
          </Grid>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 4, mt: 1 }}
          >
            {/* <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid> */}
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Button
                //disabled={isCheckingAuthentication} //TO DO: QUE SE DESHABILITE EL BOTÓN
                type="submit"
                variant="contained"
                sx={{ fontSize: "12px", width: "200px" }}
                // fullWidth
              >
                Cambiar contraseña
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sx={
                {
                  /* border: 1 */
                }
              }
            >
              <Grid
                container
                direction="column"
                //justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    onClick={restorePassword}
                    sx={{ fontSize: "12px", width: "200px" }}
                  >
                    Restaurar contraseña
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ mt: 0.5 }}>
                  <IconButton
                    sx={{
                      color: "primary.main",
                      //color: user.isDataModifier ? "primary.main" : "grey",
                      visibility: user.isDataModifier ? "" : "hidden",
                    }}
                    onClick={showRestoreButtons}
                  >
                    <GroupsIcon />
                  </IconButton>
                </Grid>

                {showRestoreAllUsersButton && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      mt: 0.5,
                      visibility: showRestoreAllUsersButton ? "" : "hidden",
                    }}
                  >
                    {appUsers.map((user) => (
                      <Grid key={user.id} item xs={12}>
                        <Button
                          variant="outlined"
                          onClick={() => restorePassword(user.id)}
                          sx={{
                            fontSize: "12px",
                            width: "200px",
                          }}
                        >
                          Restaurar - {user.shortName}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
