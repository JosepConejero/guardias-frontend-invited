/* eslint-disable no-unused-vars */
import { Button, Grid, TextField } from "@mui/material";
import { useUiStore } from "../../hooks/useUiStore";
import Modal from "react-modal";
import { customStyles } from "../../helpers";
import { useEffect, useState } from "react";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";

Modal.setAppElement("#root");

const emptyAppUser = {
  name: "",
  shortName: "",
  email: "",
  isAdmin: false,
  isActivated: false,
  isDataModifier: false,
  isTechnician: false,
  canFLC: false,
  canSeeStatistics: false,
  isStillWorking: false,
};

export const AppUserNameModal = () => {
  const { isAppUsersModalOpen, closeAppUserModal } = useUiStore();
  const { startSavingAppUser, activeAppUser, setInactiveAppUser } =
    useAppUsersStore();

  const [formValues, setFormValues] = useState(emptyAppUser);
  const [formSubmitted, setFormSubmitted] = useState(false); //TO DO: esto lo necesitaré para controlar validaciones del formulario

  const onInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    //aquí haría validaciones que podrían poner el formSubmitted a false (vídeo 357 '5 más o menos)
    await startSavingAppUser(formValues);
    onCloseModal();
    setFormValues(emptyAppUser);
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
      <Modal
        isOpen={isAppUsersModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <form
          aria-label="submit-form"
          onSubmit={onSubmit}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            /* sx={{ boxShadow: 10 }} */
          >
            <Grid item sm={12} sx={{ mt: 1 }}>
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
            <Grid item sm={12} sx={{ mt: 1 }}>
              <TextField
                label="Nombre corto del usuario"
                type="text"
                placeholder="Anota el nombre corto del usuario"
                fullWidth
                name="shortName"
                value={formValues.shortName}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 1 }}>
              <Button
                /* disabled={isAuthenticating} */
                type="submit"
                variant="contained"
                fullWidth
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>
    </>
  );
};
