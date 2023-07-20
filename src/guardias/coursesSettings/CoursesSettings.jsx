/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { ListItemCourses } from "./ListItemCourses";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useUiStore } from "../../hooks/useUiStore";
import { CourseNameModal } from "../modals/CourseNameModal";
import { useEffect } from "react";

export const CoursesSettings = () => {
  const { openCourseModal } = useUiStore();
  const { courses, startLoadingCourses } = useCoursesStore();

  const onAddCourse = () => {
    openCourseModal();
  };

  useEffect(() => {
    if (courses.length === 0) startLoadingCourses();
    //si fuera el inicio y no hubiera cursos creados, volvería a llamar startLoadingCourses ¿daría un error?
  }, []);

  return (
    <>
      <Grid
        container
        //justifyContent="center"
        // alignItems="center"
        direction="column"
        sx={{
          width: { md: "600px" },
        }}
      >
        <Grid item xs={12} sx={{ mr: 1 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            sx={{ border: 1, borderRadius: 2, color: "white", bgcolor: "grey" }}
          >
            <Grid
              item
              md={8.4}
              //sx={{ border: 1 }}
            >
              <Typography sx={{ fontWeight: "bold", ml: 2, fontSize: "14px" }}>
                Curso
              </Typography>
            </Grid>
            <Grid
              item
              md={1}
              //sx={{ border: 1 }}
            >
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
            </Grid>
            <Grid
              item
              md={1.8}
              //sx={{ border: 1 }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  /* ml: 1, */ fontSize: "14px",
                  textAlign: "center",
                }}
              >
                Frecuente
              </Typography>
            </Grid>
            <Grid
              item
              md={0.8}
              //ml={-3}
              //sx={{ border: 1 }}
            >
              <IconButton onClick={onAddCourse}>
                <AddCircleIcon sx={{ color: "white" }} />
              </IconButton>
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

      {/* <List
        sx={{
          width: "100%",
          maxWidth: 560,
          // bgcolor: "red", 
          m: 0,
          p: 0,
        }}
        subheader={
          <>
            <ListSubheader>
              <span>Curso </span>
              <span> FLC </span>
              <span> frequent</span>
              <IconButton onClick={onAddCourse}>
                <AddCircleIcon />
              </IconButton>
            </ListSubheader>
          </>
        }
      >
        {courses.map(
          (course) =>
            course.title !== "SIN CURSO" && (
              <ListItemCourses key={course.id} course={course} />
            )
        )}
      </List> */}
      <CourseNameModal />
    </>
  );
};
