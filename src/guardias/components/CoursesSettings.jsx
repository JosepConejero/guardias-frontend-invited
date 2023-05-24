/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton, List, ListSubheader } from "@mui/material";
import { useEffect } from "react";
import { ListItemCourses } from "./ListItemCourses";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useUiStore } from "../../hooks/useUiStore";
import { CourseNameModal } from "./CourseNameModal";

export const CoursesSettings = () => {
  const { openCourseModal } = useUiStore();
  const { startLoadingCourses, courses } = useCoursesStore();

  const onAddCourse = () => {
    //    console.log("añade curso");
    //abre el modal
    openCourseModal();
  };

  useEffect(() => {
    startLoadingCourses();
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
