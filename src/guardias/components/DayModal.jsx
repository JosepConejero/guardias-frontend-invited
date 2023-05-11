import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useDispatch } from "react-redux";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const emptyGuardDay = {
  simpleDate: { year: 2999, month: 0, day: 0 },
  technicians: [],
  holiday: false,
  twoHoursCourse: false,
  note: "día vacío",
  cantTechnicians: [],
};

export const DayModal = () => {
  /*   const dispatch = useDispatch(); */
  const { isDayModalOpen, closeDayModal } = useUiStore();
  const { activeGuardDay, guardDayInformation, startSavingGuardDay } =
    useCalendarStore();

  /*  const [isOpen, setIsOpen] = useState(true); */
  const [formSubmitted, setFormSubmitted] = useState(false); //TO DO: esto lo necesitaré para controlar validaciones del formulario

  const [formValues, setFormValues] = useState(emptyGuardDay);

  //podría ser necesario aquí un useMemo que incluyera formSubmitted

  const onInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: [target.value] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    //aquí haría validaciones que podrían poner el formSubmitted a false (vídeo 357 '5 más o menos)
    await startSavingGuardDay(formValues);

    onCloseModal();
    setFormSubmitted(false);
  };

  const onCloseModal = () => {
    //antes de cerrar el modal tengo que hacer que activeGuardDay valga null
    //dispatch(setActiveGuardDay(null));
    closeDayModal();
  };

  useEffect(() => {
    if (activeGuardDay !== null) {
      const newFormValues = guardDayInformation(activeGuardDay);
      if (newFormValues) {
        setFormValues({ ...newFormValues });
      } else {
        setFormValues({
          ...emptyGuardDay,
          simpleDate: {
            day: activeGuardDay.day,
            month: activeGuardDay.month,
            year: activeGuardDay.year,
          },
        });
      }
    }
  }, [activeGuardDay]);

  return (
    <>
      <Modal
        isOpen={isDayModalOpen}
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
            <Grid item sm={12}>
              <Typography sx={{ textAlign: "center" }}>
                Guardias y formaciones
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography sx={{ textAlign: "center" }}>
                {`${formValues.simpleDate.year}-${formValues.simpleDate.month}-${formValues.simpleDate.day} `}
              </Typography>
            </Grid>
            <Divider />
            <Grid item sm={12} sx={{ mt: 1 }}>
              <TextField
                label="Notas"
                type="text"
                placeholder="Anote algo aquí"
                fullWidth
                name="note"
                value={formValues.note}
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
