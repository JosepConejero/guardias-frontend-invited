/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useUiStore } from "../../hooks/useUiStore";

import { Dialog } from "@mui/material";
//import { customStyles } from "../../helpers";
import { useEffect, useState } from "react";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import { ButtonsBox } from "./dayModalComponents/ButtonsBox";
import Swal from "sweetalert2";
import { useCheckboxes } from "../../hooks";

//Modal.setAppElement("#root");

const emptyCourse = {
  title: "",
  flc: true,
  frequent: false,
};

export const CourseNameModal = () => {
  const { isCourseModalOpen, closeCourseModal } = useUiStore();
  const { startSavingCourse, activeCourse, setInactiveCourse } =
    useCoursesStore();

  const [formValues, setFormValues] = useState(emptyCourse);
  const [formSubmitted, setFormSubmitted] = useState(false); //TO DO: esto lo necesitaré para controlar validaciones del formulario

  const { checkedCheckbox: flc, onHandleClick: onHandleClickFlc } =
    useCheckboxes(formValues.flc);

  const { checkedCheckbox: frequent, onHandleClick: onHandleClickFrequent } =
    useCheckboxes(formValues.frequent);

  const onInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onCheckboxChangeFormValues = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.checked });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    //aquí haría validaciones que podrían poner el formSubmitted a false (vídeo 357 '5 más o menos)
    if (formValues.title !== "") {
      console.log({ formValues });
      await startSavingCourse(formValues);
      onCloseModal();
      setFormValues(emptyCourse);
    } else {
      Swal.fire({
        title: "El nombre del curso no puede estar vacío.",
        text: "Por favor, modifica esto antes de guardar",
        target: document.getElementById("dialog-courses"), //target: document.getElementById('dialog'),
        icon: "error",
      });
    }
    setFormSubmitted(false);
  };

  useEffect(() => {
    if (activeCourse !== null) {
      setFormValues({ ...activeCourse });
    } else {
      setFormValues({ ...emptyCourse });
    }
  }, [activeCourse]);

  const onCloseModal = () => {
    setInactiveCourse();
    closeCourseModal();
  };
  return (
    <>
      <Dialog
        open={isCourseModalOpen}
        onClose={onCloseModal}
        id="dialog-courses"
        //scroll="paper"
        // style={customStyles}
        //className="modal"
        //overlayClassName="modal-fondo"
        //closeTimeoutMS={200}
        //maxWidth={false}
        //fullScreen
        sx={{
          //width: { xs: "100%", md: "100%" },
          //height: { xs: "100%", md: "100%" },
          width: "100%",
          height: "100%",
          //maxWidth: "100%",
          //maxWidth: "900px",
          //borderRadius: 25,
          //bgcolor: "green",
          //opacity: 0.2,
          //border: "2px black solid",
          //borderRadius: "50px",

          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          //mt: { md: -3 },
          //m: { xs: 1 },
          p: { xs: 1, md: 0 },
          //borderRadius: 3,
          //"& .MuiDialog-root": { margin: "0px", padding: "0px" },
          // "& .MuiDialog-container": {
          //   margin: "0px",
          //   padding: "0px",
          //   maxHeight: "100%",
          //   maxWidth: "100%",
          // },
          "& .MuiGrid-root MuiGrid-item": { margin: "0px" },
        }}
        // PaperProps={{
        //   margin: "0px",
        //   padding: "0px",
        //   maxHeight: "auto",
        //   maxWidth: "100%",
        // }}
      >
        <form
          aria-label="submit-form"
          onSubmit={onSubmit}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid
            container
            direction="column"
            //alignItems="center"
            //justifyContent="center"
            /* sx={{ boxShadow: 10 }} */

            sx={{
              width: { xs: "330px", md: "600px" },
              //height: { xs: "215px", md: "225px" },
              p: { xs: "15px", md: "20px" },
              //bgcolor: "red",
              //m: 0,
              //p: 0,
              //"& .MuiGrid-root": { margin: "0px", padding: "0px" },
              /* "& .MuiPaper-root-MuiDialog-paper": {
                margin: "0px",
                padding: "0px",
              }, */
              "& .MuiGrid-root": { margin: "0px", padding: "0px" },
              "& .MuiGrid-container": { margin: "0px", padding: "0px" },
            }}
          >
            <Grid item /* sm={12} sx={{ mt: 1 }} */>
              <TextField
                //multiline={{ xs: true, md: false }}
                //rows={{ xs: 2 }}
                label="Nombre del curso"
                type="text"
                placeholder="Anota el nombre del curso aquí"
                fullWidth
                name="title"
                value={formValues.title}
                onChange={onInputChange}
                //sx={{ height: "100px" }}
              />
            </Grid>

            <Grid item /* xs={12} md={3} */>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formValues.flc}
                    name="flc"
                    onClick={onHandleClickFlc}
                    onChange={onCheckboxChangeFormValues}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    Es un curso de la FLC
                  </Typography>
                }
              />
            </Grid>

            <Grid
              item /* xs={12} md={3} */
              sx={{
                mb: 1,
                //
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formValues.frequent}
                    name="frequent"
                    onClick={onHandleClickFrequent}
                    onChange={onCheckboxChangeFormValues}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    Es un curso frecuente
                  </Typography>
                }
              />
            </Grid>

            <Grid
              item
              //spacing={1}
              sx={{
                "& .MuiGrid-root": {
                  mt: "0px",
                  ml: "0px",
                  //pt: 0,
                  //pr: 0,
                  p: 0,
                  width: "auto",
                  //width: "250px",
                  // padding: "0px",
                },
                /* "& .MuiGrid-item": {
                  mt: "0px",
                  ml: "0px",
                  p: 0,
                  //pr: 0,
                  width: "auto",
                  //width: "250px",
                  // padding: "0px",
                }, */
              }}
            >
              <ButtonsBox onCloseModal={onCloseModal} />
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </>
  );
};
