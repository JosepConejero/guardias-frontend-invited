/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppUsersStore, useAuthStore, useForm } from "../../hooks";
import Swal from "sweetalert2";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch, useSelector } from "react-redux";
import { switchShowRestoreAllUsersButton } from "../../store/month/monthSlice";
import { Confirmation } from "../../ui/pages/Confirmation";
import { Spinner } from "../customizedComponents";

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
  const {
    updatePassword,
    startRestoringPassword,
    user,
    isChangingPassword,
    isRestoringPassword,
  } = useAuthStore();
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
  const { appUsers, startLoadingAppUsers } = useAppUsersStore();
  // const { appUsers, startLoadingAppUsers } = useSelector(
  //   (state) => state.appUser
  // );
  const { showRestoreAllUsersButton } = useSelector((state) => state.month);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);

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

  const restorePassword = async (id) => {
    setFormSubmitted(false);

    try {
      const data = await startRestoringPassword({
        id,
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
          text: "Se recomienda cambiar la contraseña",
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

  const handleOpen = (id) => {
    setOpen(true);
    setUserId(id);
  };

  const handleClose = (answer) => {
    // console.log({ userId, answer });
    if (answer) {
      if (userId) {
        restorePassword(userId);
      }
    }
    setOpen(false);
    setUserId(null);
  };

  useEffect(() => {
    if (appUsers.length === 0) startLoadingAppUsers();
  }, []);

  if (isChangingPassword) return <Spinner text="Changing password..." />;
  if (isRestoringPassword) return <Spinner text="Restoring password..." />;

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

            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => handleOpen(user.uid)}
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

            <Grid item xs={12}>
              <Grid container direction="column" alignItems="center">
                {user.isDataModifier &&
                  showRestoreAllUsersButton &&
                  appUsers.map((thisUser) => (
                    <Grid key={thisUser.id} item xs={12}>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpen(thisUser.id)}
                        sx={{
                          fontSize: "12px",
                          width: "200px",
                          mb: 0.25,
                        }}
                      >
                        Restaurar - {thisUser.shortName}
                      </Button>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Confirmation
        question="¿Seguro que quiere restaurar la contraseña?"
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
