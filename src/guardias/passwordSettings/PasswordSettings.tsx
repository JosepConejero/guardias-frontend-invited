/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useAppUsersStore, useAuthStore, useForm } from "../../hooks";
import Swal from "sweetalert2";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch, useSelector } from "react-redux";
import { switchShowRestoreAllUsersButton } from "../../store/month/monthSlice";
import { Confirmation } from "../../ui/pages/Confirmation";
import { Spinner } from "../customizedComponents";
import { RootState } from "../../store";
import { User } from "../../interfaces";
import { DataType } from "../../types/DataType";
import { FormValidations, InitialForm } from "../../types/FormTypes";

const formFields: InitialForm = {
  password0: "",
  password: "",
  password2: "",
};

const formValidations: FormValidations = {
  password0: [
    (value: string) => value.length >= 6,
    "El password debe tener como mínimo 6 letras",
  ],
  password: [
    (value: string) => value.length >= 6,
    "El password debe tener como mínimo 6 letras",
  ],
  password2: [
    (value: string) => value.length >= 6,
    "El password debe tener como mínimo 6 letras",
  ],
};

export const PasswordSettings = (): JSX.Element => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
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
  const { showRestoreAllUsersButton } = useSelector(
    (state: RootState) => state.month
  );
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const dispatch = useDispatch();

  const showRestoreButtons = () => {
    dispatch(switchShowRestoreAllUsersButton());
  };

  const onSubmit = async (event: FormEvent) => {
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
      const data: DataType | void = await updatePassword({
        email: user.email,
        password: password0,
        password2: password,
      });
      if (!!data) {
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

  const restorePassword = async (id: string) => {
    setFormSubmitted(false);

    try {
      const data = await startRestoringPassword({ id });
      if (!!data) {
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
      }

      onResetForm();
    } catch (error) {
      Swal.fire({
        title: "Error a la hora de restaurar la contraseña",

        icon: "error",
      });
    }
  };

  const handleOpen = (id: string) => {
    setOpen(true);
    setUserId(id);
  };

  const handleClose = (answer: boolean) => {
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

  if (isChangingPassword) return <Spinner text="Cambiando contraseña..." />;
  if (isRestoringPassword) return <Spinner text="Restaurando contraseña..." />;

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
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ fontSize: "12px", width: "200px" }}
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
                  appUsers.map((thisUser: User) => (
                    <Grid key={thisUser.id} item xs={12}>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpen(thisUser.id!)}
                        sx={{
                          fontSize: "12px",
                          width: "200px",
                          mb: 0.25,
                          visibility:
                            user.shortName === "JOSEP" ||
                            (user.shortName !== "JOSEP" &&
                              thisUser.shortName !== "JOSEP")
                              ? ""
                              : "hidden",
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
