/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

import { customStyles, monthNames } from "../../helpers";

import { CheckboxesBox } from "./dayModalComponents/CheckboxesBox";
import { UserTechniciansBox } from "./dayModalComponents/UserTechniciansBox";
import { UsersGuardsBox } from "./dayModalComponents/UsersGuardsBox";
import { useDispatch } from "react-redux";
import { onDeactivateGuardDay } from "../../store/calendar/calendarSlice";
import { useGuardDayStore } from "../../hooks/useGuardDayStore";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const emptyGuardDay = {
  simpleDate: { year: 2999, month: 0, day: 0 },
  technicians: [],
  isHoliday: false,
  isThereOffice2h: false,
  isThereExtraMeeting: false,
  extraMeetingText: "",
  note: "",
  techniciansOut: [],
};

export const DayModal = () => {
  const dispatch = useDispatch();
  const { isDayModalOpen, closeDayModal } = useUiStore();
  const { activeGuardDay, guardDayInformation, startSavingGuardDay } =
    useCalendarStore();
  const { selectGuardDay, deselectGuardDay } = useGuardDayStore();
  const { guardDayOpened, loadTechniciansInGuardDay } = useGuardDayStore();
  const { getTeachersIn, emptyTeachersName } = useAppUsersStore();

  let newFormValues = {};
  if (activeGuardDay) {
    newFormValues = guardDayInformation(activeGuardDay);

    if (!newFormValues) {
      newFormValues = {
        ...emptyGuardDay,
        simpleDate: {
          day: activeGuardDay.day,
          month: activeGuardDay.month,
          year: activeGuardDay.year,
        },
      };
    }
  } else {
    newFormValues = emptyGuardDay;
  }

  // eslint-disable-next-line no-unused-vars
  const [formSubmitted, setFormSubmitted] = useState(false); //TO DO: esto lo necesitaré para controlar validaciones del formulario
  const [formValues, setFormValues] = useState(newFormValues);

  //podría ser necesario aquí un useMemo que incluyera formSubmitted

  /*   const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    // si la persona no ha ingresado el título o el título está vacío, mostraré el input en rojo (error)
    return formValues.notas.length > 0 ? "is-valid" : "is-invalid"; // puedo quitar el is-valid pq cn se hace el submit del formulario, ya no hace falta
  }, [formValues.notas, formSubmitted]); */

  const onSubmit = async (event) => {
    event.preventDefault();
    //console.log({ guardDayOpened });
    ////setFormSubmitted(true);
    //aquí haría validaciones que podrían poner el formSubmitted a false (vídeo 357 '5 más o menos)
    //if (formValues.note.length <= 0) return;
    //console.log(formValues);
    //await startSavingGuardDay(formValues);

    if (!emptyTeachersName(guardDayOpened.technicians)) {
      await startSavingGuardDay(guardDayOpened);
      onCloseModal();
    } else {
      Swal.fire(
        "Los nombres de los técnicos/formadores de guardia no pueden estar vacíos.",
        "Por favor, modifica esto antes de guardar",
        "error"
      );
    }

    ////setFormSubmitted(false);
  };

  const onCloseModal = () => {
    //antes de cerrar el modal tengo que hacer que activeGuardDay valga null
    dispatch(onDeactivateGuardDay());
    closeDayModal();
    //dispatch(onDeselectGuardDay());
    deselectGuardDay();
  };

  useEffect(() => {
    //if (activeGuardDay !== null) {
    if (activeGuardDay) {
      const newFormValues = guardDayInformation(activeGuardDay);

      if (newFormValues) {
        setFormValues({ ...newFormValues });
        selectGuardDay({ ...newFormValues });
      } else {
        setFormValues({
          ...emptyGuardDay,
          simpleDate: {
            day: activeGuardDay.day,
            month: activeGuardDay.month,
            year: activeGuardDay.year,
          },
        });
        selectGuardDay({
          ...emptyGuardDay,
          simpleDate: {
            day: activeGuardDay.day,
            month: activeGuardDay.month,
            year: activeGuardDay.year,
          },
        });
        /* dispatch(
            onSelectGuardDay({
              ...emptyGuardDay,
              simpleDate: {
                day: activeGuardDay.day,
                month: activeGuardDay.month,
                year: activeGuardDay.year,
              },
            })
            ); */
      }
    }
  }, [activeGuardDay]);

  useEffect(() => {
    if (guardDayOpened) {
      //ESTOY AQUÍ CON TEACHERS: TENGO QUE CARGAR LOS TEACHERSIN EN EL ESTADO
      //let teachersIn = getTeachersIn([...guardDayOpened.techniciansOut]);
      loadTechniciansInGuardDay(
        /*  getTechniciansInShortNames(
          techniciansShortNames,
          getTechniciansOutShortNames(guardDayOpened?.techniciansOut)
        ) */
        getTeachersIn([...guardDayOpened.techniciansOut])
      );
    }
  }, [guardDayOpened?.techniciansOut]);

  if (!guardDayOpened) return;

  return (
    <>
      <Modal
        isOpen={isDayModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        /* className="modal" */
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <form
          aria-label="submit-form"
          onSubmit={onSubmit}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Stack>
            <Grid
              container
              sx={{
                display: "flex" /* , minWidth: "auto", maxWidth: "auto" */,
                /* width: "600px", */
                width: { xs: "100%", md: "auto" },
                /*  bgcolor: "black", */
              }}
            ></Grid>
            <Grid item>
              <Typography sx={{ textAlign: "center" }}>
                DÍA DE LA SEMANA, {formValues.simpleDate.day} de{" "}
                {monthNames[formValues.simpleDate.month].toUpperCase()} de{" "}
                {formValues.simpleDate.year}
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              sx={{
                display: "flex" /* , minWidth: "auto", maxWidth: "auto" */,
                /* width: "600px", */
                width: { xs: "100%", md: "auto" },
                /*  bgcolor: "black", */
              }}
              /* spacing={1 / 2} */
            >
              <Grid item xs={12} md={9} p={1} sx={{ width: "450px" }}>
                <UsersGuardsBox />
              </Grid>
              <Grid item xs={12} md={3} p={1}>
                <UserTechniciansBox />
              </Grid>
              <Grid item xs={12} md={12} p={1}>
                <CheckboxesBox />
              </Grid>
            </Grid>

            <Grid
              container
              sx={{
                display: "flex",
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Grid item>
                <Button
                  /* disabled={isAuthenticating} */
                  onClick={onCloseModal}
                  variant="contained"
                  fullWidth
                >
                  CANCELAR
                </Button>
              </Grid>
              <Grid item>
                <Button
                  /* disabled={isAuthenticating} */
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  GUARDAR
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
