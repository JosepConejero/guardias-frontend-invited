/* eslint-disable no-unused-vars */
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useUiStore } from "../../hooks/useUiStore";

import { FormEvent, useEffect, useState } from "react";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import { ButtonsBox } from "./dayModalComponents/ButtonsBox";
import Swal from "sweetalert2";
import { useCheckboxes } from "../../hooks";
import { SpinnerInModal } from "../customizedComponents";
import { Course } from "../../interfaces";

const emptyCourse: Course = {
  title: "",
  flc: true,
  frequent: false,
};

export const CourseNameModal = (): JSX.Element => {
  const { closeCourseModal } = useUiStore();
  const { startSavingCourse, activeCourse, setInactiveCourse, isSaving } =
    useCoursesStore();

  const [formValues, setFormValues] = useState<Course>(emptyCourse);
  const [, setFormSubmitted] = useState<boolean>(false); //formSubmitted

  const { onHandleClick: onHandleClickFlc } = useCheckboxes(formValues.flc);

  const { onHandleClick: onHandleClickFrequent } = useCheckboxes(
    formValues.frequent
  );

  const onInputChange = ({
    target,
  }: {
    target: EventTarget & (HTMLInputElement | HTMLTextAreaElement);
  }) => {
    //:KeyboardEvent
    setFormValues({ ...formValues, [target.name]: target?.value });
  };

  const onCheckboxChangeFormValues = ({
    target,
  }: {
    target: HTMLInputElement;
  }) => {
    setFormValues({ ...formValues, [target.name]: target.checked });
  };

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setFormSubmitted(true);
    if (formValues.title !== "") {
      await startSavingCourse(formValues);
      onCloseModal();
      setFormValues(emptyCourse);
    } else {
      Swal.fire({
        title: "El nombre del curso no puede estar vacío.",
        text: "Por favor, modifica esto antes de guardar",
        target: document.getElementById("modal-fondo")!,
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
      {isSaving ? (
        <SpinnerInModal text="Grabando..." />
      ) : (
        <>
          <Grid
            sx={{
              width: { xs: "390px", md: "600px" },
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
                <Grid item>
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

                <Grid item>
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

                <Grid item sx={{ mb: 1 }}>
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
