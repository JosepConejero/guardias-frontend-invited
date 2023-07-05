/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

import { customStyles, customStylesIsSaving } from "../../helpers";

import { CheckboxesBox } from "./dayModalComponents/CheckboxesBox";
import { UserTechniciansBox } from "./dayModalComponents/UserTechniciansBox";
import { UsersGuardsBox } from "./dayModalComponents/UsersGuardsBox";
import { useDispatch } from "react-redux";
import { onDeactivateGuardDay } from "../../store/calendar/calendarSlice";
import { useGuardDayStore } from "../../hooks/useGuardDayStore";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import Swal from "sweetalert2";
import { DateBox } from "./dayModalComponents/DateBox";
import { ButtonsBox } from "./dayModalComponents/ButtonsBox";
import { SpinnerInModal } from "../customizedComponents";

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
  const { activeGuardDay, guardDayInformation, startSavingGuardDay, isSaving } =
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
      }
    }
  }, [activeGuardDay]);

  useEffect(() => {
    if (guardDayOpened) {
      loadTechniciansInGuardDay(
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
        style={isSaving ? customStylesIsSaving : customStyles}
        /* className="modal" */
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        sx={{ width: "900px" }}
      >
        {isSaving ? (
          <SpinnerInModal text="Saving..." />
        ) : (
          <>
            <form
              aria-label="submit-form"
              onSubmit={onSubmit}
              className="animate__animated animate__fadeIn animate__faster"
            >
              <Stack>
                <DateBox />

                <Stack>
                  <Grid container>
                    <Grid item xs={12} md={9} p={1} sx={{ width: "700px" }}>
                      <UsersGuardsBox />
                    </Grid>

                    <Grid item xs={12} md={3} p={1}>
                      <UserTechniciansBox />
                    </Grid>
                  </Grid>

                  <Grid p={1}>
                    <CheckboxesBox />
                  </Grid>
                </Stack>

                <ButtonsBox onCloseModal={onCloseModal} />
                {/*  <ButtonsBox saving={saving} onCloseModal={onCloseModal} /> */}
              </Stack>
            </form>
          </>
        )}
      </Modal>
    </>
  );
};
