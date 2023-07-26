/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { ListItemCourses } from "./ListItemCourses";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useUiStore } from "../../hooks/useUiStore";
import { CourseNameModal } from "../modals/CourseNameModal";
import { useEffect } from "react";
import { useAuthStore } from "../../hooks";

export const CoursesSettings = () => {
  const { openCourseModal } = useUiStore();
  const { courses, startLoadingCourses } = useCoursesStore();
  const { user } = useAuthStore();

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
          width: {
            //xs: "410px",
            //md: "600px",
          },
          //border: "1px red solid",
        }}
      >
        <Grid
          item /*  xs={12} */
          sx={
            {
              //  xs: { mx: 2 },
              //mr: 0,
            }
          }
        >
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
            <Grid
              item
              xs={8}
              md={8.4}
              sx={
                {
                  //border: 1
                }
              }
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px" }}
              >
                Curso
              </Typography>
            </Grid>

            <Grid
              item
              xs={1.5}
              md={1}
              sx={
                {
                  //border: 1
                }
              }
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
              xs={1.5}
              md={1.8}
              sx={
                {
                  //border: 1
                }
              }
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  //ml: 0,
                  fontSize: "14px",
                  textAlign: "center",
                  overflow: { xs: "hidden" },
                  whiteSpace: { xs: "nowrap" },
                  textOverflow: { xs: "ellipsis" },
                }}
              >
                Frecuente
              </Typography>
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
              <IconButton
                onClick={onAddCourse}
                disabled={user.isDataModifier ? false : true}
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

      <CourseNameModal />
    </>
  );
};
