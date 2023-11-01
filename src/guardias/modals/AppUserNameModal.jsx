/* eslint-disable no-unused-vars */
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useUiStore } from "../../hooks/useUiStore";
import { useEffect, useState } from "react";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import { SpinnerInModal } from "../customizedComponents";
import { useCheckboxes } from "../../hooks";
import Swal from "sweetalert2";
import "./swal2.css";
import { ButtonsBox } from "./dayModalComponents/ButtonsBox";

const emptyAppUser = {
  name: "",
  shortName: "",
  email: "",
  password: "",
  isAdmin: false,
  isActivated: false,
  isDataModifier: false,
  isTechnician: false,
  canFLC: false,
  isExternal: false,
  canSeeStatistics: false,
  isStillWorking: false,
};

export const AppUserNameModal = () => {
  const { closeAppUserModal } = useUiStore();
  const { startSavingAppUser, activeAppUser, setInactiveAppUser, isSaving } =
    useAppUsersStore();

  const [formValues, setFormValues] = useState(emptyAppUser);
  const [formSubmitted, setFormSubmitted] = useState(false); //TO DO: esto lo necesitaré para controlar validaciones del formulario

  const onInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const { checkedCheckbox: isAdmin, onHandleClick: onHandleClickIsAdmin } =
    useCheckboxes(formValues.isAdmin);

  const {
    checkedCheckbox: isActivated,
    onHandleClick: onHandleClickIsActivated,
  } = useCheckboxes(formValues.isActivated);

  const {
    checkedCheckbox: isDataModifier,
    onHandleClick: onHandleClickIsDataModifier,
  } = useCheckboxes(formValues.isDataModifier);

  const {
    checkedCheckbox: isTechnician,
    onHandleClick: onHandleClickIsTechnician,
  } = useCheckboxes(formValues.isTechnician);

  const {
    checkedCheckbox: isExternal,
    onHandleClick: onHandleClickIsExternal,
  } = useCheckboxes(formValues.isExternal);

  const { checkedCheckbox: canFLC, onHandleClick: onHandleClickCanFLC } =
    useCheckboxes(formValues.canFLC);

  const {
    checkedCheckbox: canSeeStatistics,
    onHandleClick: onHandleClickCanSeeStatistics,
  } = useCheckboxes(formValues.canSeeStatistics);

  const {
    checkedCheckbox: isStillWorking,
    onHandleClick: onHandleClickIsStillWorking,
  } = useCheckboxes(formValues.isStillWorking);

  const onCheckboxChangeFormValues = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.checked });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    //aquí haría validaciones que podrían poner el formSubmitted a false (vídeo 357 '5 más o menos)
    if (
      formValues.name !== "" &&
      formValues.shortName !== "" &&
      formValues.email !== ""
    ) {
      await startSavingAppUser(formValues);
      onCloseModal();
      setFormValues(emptyAppUser);
    } else {
      Swal.fire({
        title:
          "Ni el nombre ni el nombre corto ni el email pueden estar vacíos.",
        text: "Por favor, modifica esto antes de guardar",
        target: document.getElementById("modal-fondo"),
        icon: "error",
      });
    }
    setFormSubmitted(false);
  };

  useEffect(() => {
    if (activeAppUser !== null) {
      setFormValues({ ...activeAppUser });
    } else {
      setFormValues({ ...emptyAppUser });
    }
  }, [activeAppUser]);

  const onCloseModal = () => {
    setInactiveAppUser();
    closeAppUserModal();
  };

  return (
    <>
      {isSaving ? (
        <SpinnerInModal text="Grabando..." />
      ) : (
        <>
          <Grid
            id="dialog-app-users"
            sx={{
              width: { xs: "390px", md: "600px" },
              height: { md: "632px" },
            }}
          >
            <form
              aria-label="submit-form"
              onSubmit={onSubmit}
              className="animate__animated animate__fadeIn animate__faster"
            >
              <Grid
                container
                direction="column"
                sx={{
                  p: { xs: "15px", md: "20px" },
                }}
              >
                <Grid item sx={{ mb: 2, mt: 0.5 }}>
                  <TextField
                    label="Nombre completo del usuario"
                    type="text"
                    placeholder="Anota el nombre del usuario"
                    fullWidth
                    name="name"
                    value={formValues.name}
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid item sx={{ mb: 2 }}>
                  <TextField
                    label="Nombre corto del usuario"
                    type="text"
                    placeholder="Anota el nombre corto del usuario"
                    fullWidth
                    name="shortName"
                    value={formValues.shortName}
                    onChange={onInputChange}
                    inputProps={{ maxLength: 8 }}
                  />
                </Grid>

                <Grid item sx={{ mb: 0.5 }}>
                  <TextField
                    label="Email del usuario"
                    type="text"
                    placeholder="Anota el email del usuario"
                    fullWidth
                    name="email"
                    value={formValues.email}
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.isAdmin}
                        name="isAdmin"
                        onClick={onHandleClickIsAdmin}
                        onChange={onCheckboxChangeFormValues}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        Es un administrador
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.isActivated}
                        name="isActivated"
                        onClick={onHandleClickIsActivated}
                        onChange={onCheckboxChangeFormValues}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        Está activado
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.isDataModifier}
                        name="isDataModifier"
                        onClick={onHandleClickIsDataModifier}
                        onChange={onCheckboxChangeFormValues}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        Puede modificar datos
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.isTechnician}
                        name="isTechnician"
                        onClick={onHandleClickIsTechnician}
                        onChange={onCheckboxChangeFormValues}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        Es un técnico
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.isExternal}
                        name="isExternal"
                        onClick={onHandleClickIsExternal}
                        onChange={onCheckboxChangeFormValues}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        Es un formador externo
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.canFLC}
                        name="canFLC"
                        onClick={onHandleClickCanFLC}
                        onChange={onCheckboxChangeFormValues}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        Puede impartir FLC
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.canSeeStatistics}
                        name="canSeeStatistics"
                        onClick={onHandleClickCanSeeStatistics}
                        onChange={onCheckboxChangeFormValues}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        Puede ver las estadísticas
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.isStillWorking}
                        name="isStillWorking"
                        onClick={onHandleClickIsStillWorking}
                        onChange={onCheckboxChangeFormValues}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        Está actualmente contratado
                      </Typography>
                    }
                  />
                </Grid>

                <Grid
                  item
                  sx={{
                    "& .MuiGrid-root": {
                      mt: "0px",
                      ml: "0px",
                      p: 0,
                      width: "auto",
                    },
                  }}
                >
                  <ButtonsBox onCloseModal={onCloseModal} />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </>
      )}
    </>
  );
};
