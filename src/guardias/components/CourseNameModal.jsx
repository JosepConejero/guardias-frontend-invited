/* eslint-disable no-unused-vars */
import { Button, Grid, TextField } from "@mui/material";
import { useUiStore } from "../../hooks/useUiStore";
import Modal from "react-modal";
import { onCloseCourseModal } from "../../store/ui/uiSlice";
import { customStyles } from "../../helpers";
import { useEffect, useState } from "react";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import { onSetInactiveCourse } from "../../store/course/courseSlice";

Modal.setAppElement("#root");

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

  const onInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    //aquí haría validaciones que podrían poner el formSubmitted a false (vídeo 357 '5 más o menos)
    await startSavingCourse(formValues);
    onCloseModal();
    setFormValues(emptyCourse);
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
      <Modal
        isOpen={isCourseModalOpen}
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
                label="Nombre del curso"
                type="text"
                placeholder="Anota el nombre del curso aquí"
                fullWidth
                name="title"
                value={formValues.title}
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
