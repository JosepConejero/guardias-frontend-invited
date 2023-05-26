/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

import { customStyles, monthNames } from "../../helpers";
import { Check } from "@mui/icons-material";
import { CheckboxesBox } from "./dayModalComponents/CheckboxesBox";
import { UserTechniciansBox } from "./dayModalComponents/UserTechniciansBox";
import { UsersGuardsBox } from "./dayModalComponents/UsersGuardsBox";

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
  /*   const dispatch = useDispatch(); */
  const { isDayModalOpen, closeDayModal } = useUiStore();
  const { activeGuardDay, guardDayInformation, startSavingGuardDay } =
    useCalendarStore();

  /*  const [isOpen, setIsOpen] = useState(true); */
  // eslint-disable-next-line no-unused-vars
  const [formSubmitted, setFormSubmitted] = useState(false); //TO DO: esto lo necesitaré para controlar validaciones del formulario

  const [formValues, setFormValues] = useState(emptyGuardDay);

  //podría ser necesario aquí un useMemo que incluyera formSubmitted

  const onInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    //aquí haría validaciones que podrían poner el formSubmitted a false (vídeo 357 '5 más o menos)
    // console.log(formValues);
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
              <Grid item xs={12} md={9} p={1}>
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

// <Grid
//                 item
//                 container
//                 sx={{ flexDirection: "column", bgcolor: "green" }}
//               >
//
//               </Grid>

// {/* GRID 2A */}
// <Grid
//   item
//   xs={12}
//   md={6}
//   sx={{
//     /* boxShadow: 300, */
//     bgcolor: "red",
//     border: "5px black solid",
//     /* height: "500px",
//     width: "500px", */
//     /* m: 10, */
//   }}
// >
//   <Stack>
//     <Typography>
//       MECAGON L'HOSTIA PUTA JODER REDEU ASDFASDF ASD FAS
//     </Typography>
//     <Typography>TONI</Typography>
//     <Typography>TONI</Typography>
//     <Typography>TONI</Typography>
//     <Typography>TONI</Typography>
//     <Typography>TONI</Typography>
//     <Typography>TONI</Typography>
//   </Stack>
// </Grid>
// {/* GRID 2B */}
// <Grid
//   item
//   xs={12}
//   md={6}
//   sx={{
//     /* display: { xs: "none", md: "flex" }, */
//     bgcolor: "blueviolet",
//     /*  flexDirection: "column", */
//   }}
//   /*     m={10} */
// >
//
// </Grid>
