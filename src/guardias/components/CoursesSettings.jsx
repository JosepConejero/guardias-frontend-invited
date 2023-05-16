/* eslint-disable react-hooks/exhaustive-deps */
import { List, ListSubheader } from "@mui/material";
import { useEffect } from "react";
import { ListItemCourses } from "./ListItemCourses";
import { useCoursesStore } from "../../hooks/useCoursesStore";

export const CoursesSettings = () => {
  const { startLoadingCourses, courses } = useCoursesStore();

  useEffect(() => {
    startLoadingCourses();
  }, []);
  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}
        subheader={
          <>
            <ListSubheader>
              <span>Curso</span>
              <span>FLC</span>
              <span>frequent</span>
            </ListSubheader>
          </>
        }
      >
        {courses.map((course) => (
          <ListItemCourses key={course.id} course={course} />
        ))}
      </List>
    </>
  );
};
