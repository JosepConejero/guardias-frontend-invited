import { IconButton, List, ListSubheader } from "@mui/material";
import { ListItemCourses } from "./ListItemCourses";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useUiStore } from "../../hooks/useUiStore";
import { CourseNameModal } from "../modals/CourseNameModal";

export const CoursesSettings = () => {
  const { openCourseModal } = useUiStore();
  const { courses } = useCoursesStore();

  const onAddCourse = () => {
    openCourseModal();
  };

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
