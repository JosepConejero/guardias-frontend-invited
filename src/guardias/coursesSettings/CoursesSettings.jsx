/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton, List, ListSubheader } from "@mui/material";
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
      <List
        sx={{
          width: "100%",
          maxWidth: 560,
          /* bgcolor: "red", */
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
        {courses.map((course) => (
          <ListItemCourses key={course.id} course={course} />
        ))}
      </List>
      <CourseNameModal />
    </>
  );
};
