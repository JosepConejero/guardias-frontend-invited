/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { ListItemCourses } from "./ListItemCourses";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useUiStore } from "../../hooks/useUiStore";
import { CourseNameModal } from "../modals/CourseNameModal";
import { useEffect } from "react";
import { useAuthStore } from "../../hooks";
//import { useBasicModal } from "../../hooks/useBasicModal";
import { BasicModal } from "../modals/basicModal/BasicModal";
import { useSelector } from "react-redux";
import { Spinner } from "../customizedComponents";

export const CoursesSettings = () => {
  // const { isOpen, openModal, closeModal } = useBasicModal(false);
  const { openCourseModal, closeCourseModal } = useUiStore();
  const { isCourseModalOpen } = useSelector((state) => state.ui);
  const { courses, startLoadingCourses, isDeletingCourse } = useCoursesStore();
  const { user } = useAuthStore();

  const onAddCourse = () => {
    openCourseModal();
  };

  useEffect(() => {
    if (courses.length === 0) startLoadingCourses();
    //si fuera el inicio y no hubiera cursos creados, volvería a llamar startLoadingCourses ¿daría un error?
  }, []);

  if (isDeletingCourse) return <Spinner text="Borrando..." />;

  return (
    <>
      {/*       {isDeleting ? (
        <Spinner text="Borrando..." />
      ) : (
        <> */}
      <Grid container /* px={2} */ sx={{ px: { md: 2 } }} direction="column">
        <Grid item>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            sx={{
              //border: 1,
              borderRadius: 2,
              //color: "white",
              bgcolor: "lightgrey",
            }}
          >
            <Grid item xs={8} md={8.4}>
              <Tooltip
                title="Nombre del curso"
                arrow /* placement="bottom-start" */
              >
                <Typography
                  sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px" }}
                >
                  Curso
                </Typography>
              </Tooltip>
            </Grid>

            <Grid item xs={1.5} md={1}>
              <Tooltip title="Indica si es un curso de la FLC" arrow>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    //ml: 1,
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  FLC
                </Typography>
              </Tooltip>
            </Grid>

            <Grid item xs={1.5} md={1.8}>
              <Tooltip
                title="Indica si un curso se imparte con frecuencia"
                arrow
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    //ml: 0,
                    fontSize: "14px",
                    textAlign: "center",
                    overflow: user.isDataModifier ? { xs: "auto" } : { xs: "" },
                    whiteSpace: user.isDataModifier
                      ? { xs: "nowrap" }
                      : { xs: "" },
                    textOverflow: user.isDataModifier
                      ? { xs: "ellipsis" }
                      : { xs: "" },
                  }}
                >
                  Frecuente
                </Typography>
              </Tooltip>
            </Grid>

            <Grid
              item
              xs={1}
              md={0.8}
              //pr={3}
              //sx={{ border: 1, p: 0 }}
              //sx={{ pr: 2 }}
              sx={{
                //color: "white"
                //pr: 0.5,
                // border: 1,
                //"& .MuiButtonBase-root": { padding: 0 },
                "& .MuiIconButton-root": {
                  pl: { xs: "2px", md: "8px" },
                  py: "8px",
                },
              }}
            >
              <Tooltip title="Añade un curso" arrow>
                <IconButton
                  onClick={onAddCourse}
                  //disabled={user.isDataModifier ? false : true}
                  sx={{
                    visibility: user.isDataModifier ? "" : "hidden",
                    //color: "white"
                    //pr: 0.5,
                    // border: 1,
                    // "& .MuiButtonBase-root": { padding: 0 },
                    // "& .MuiIconButton-root": { padding: 0 },
                  }}
                >
                  <AddCircleIcon
                    sx={{
                      color: user.isDataModifier ? "primary.main" : "grey",
                      //color: "white"
                      //pr: 0.5,
                      // border: 1,
                      // "& .MuiButtonBase-root": { padding: 0 },
                      // "& .MuiIconButton-root": { padding: 0 },
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Stack>
            {courses.map(
              (course) =>
                course.title !== "SIN CURSO" && (
                  <ListItemCourses key={course.id} course={course} />
                )
            )}
          </Stack>
        </Grid>
      </Grid>

      <BasicModal isOpen={isCourseModalOpen} closeModal={closeCourseModal}>
        <CourseNameModal closeModal={closeCourseModal} />
      </BasicModal>
      {/*         </>
      )}
      {isDeleting ? "borrando" : "no borra na"} */}
    </>
  );
};
