/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { ListItemCourses } from "./ListItemCourses";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useUiStore } from "../../hooks/useUiStore";
import { CourseNameModal } from "../modals/CourseNameModal";
import { useEffect } from "react";
import { useAuthStore, useCalendarStore } from "../../hooks";
import { BasicModal } from "../modals/basicModal/BasicModal";
import { useSelector } from "react-redux";
import { Spinner } from "../customizedComponents";
import { Course } from "../../interfaces";
import { RootState } from "../../store";

export const CoursesSettings = (): JSX.Element => {
  const { openCourseModal, closeCourseModal } = useUiStore();
  const { isCourseModalOpen } = useSelector((state: RootState) => state.ui);
  const { courses, startLoadingCourses, isDeletingCourse } = useCoursesStore();
  const { user } = useAuthStore();
  const { guardDays, startLoadingGuardDays } = useCalendarStore();

  const onAddCourse = () => {
    openCourseModal();
  };

  useEffect(() => {
    if (courses.length === 0) startLoadingCourses();
    if (guardDays.length === 0) startLoadingGuardDays();
  }, []);

  if (isDeletingCourse) return <Spinner text="Borrando..." />;

  return (
    <>
      <Grid container sx={{ px: { md: 2 } }} direction="column">
        <Grid item>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            sx={{
              borderRadius: 2,
              bgcolor: "lightgrey",
            }}
          >
            <Grid item xs={8} md={8.4}>
              <Tooltip title="Nombre del curso" arrow>
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
              sx={{
                "& .MuiIconButton-root": {
                  pl: { xs: "2px", md: "8px" },
                  py: "8px",
                },
              }}
            >
              <Tooltip title="Añade un curso" arrow>
                <IconButton
                  onClick={onAddCourse}
                  sx={{
                    visibility: user.isDataModifier ? "" : "hidden",
                  }}
                >
                  <AddCircleIcon
                    sx={{
                      color: user.isDataModifier ? "primary.main" : "grey",
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
              (course: Course) =>
                course.title !== "SIN CURSO" && (
                  <ListItemCourses key={course.id!} course={course} />
                )
            )}
          </Stack>
        </Grid>
      </Grid>

      <BasicModal isOpen={isCourseModalOpen} closeModal={closeCourseModal}>
        <CourseNameModal />
      </BasicModal>
    </>
  );
};
