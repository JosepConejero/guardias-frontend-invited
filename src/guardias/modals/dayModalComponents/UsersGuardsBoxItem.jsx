import { Grid, IconButton } from "@mui/material";
import { LabelButton } from "./LabelButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { useAppUsersStore } from "../../../hooks/useAppUsersStore";
import TeachersMenu from "./TeachersMenu";
import CoursesMenu from "./CoursesMenu";
import { useSelector } from "react-redux";
import { useCoursesStore } from "../../../hooks/useCoursesStore";

export const UsersGuardsBoxItem = ({ onDeleteItem, index }) => {
  const { guardDayOpened, techniciansInGuardDay, updateOpenedGuardDay } =
    useGuardDayStore();
  const { getTeacherById } = useAppUsersStore();
  const { sortedCourses, getCourseById } = useCoursesStore();

  const { courses } = useSelector((state) => state.course);
  const coursesGuardDay = [...sortedCourses(courses)];

  let initialTeacher = getTeacherById(
    guardDayOpened.technicians[index].technicianId
  );

  //que aquí compruebe si está el curso "sin curso" y si no, que lo cree
  const initialCourse = getCourseById(
    courses,
    guardDayOpened.technicians[index].courseId
  );

  const onLabelChange = (value, name) => {
    let newTechnicians = [...guardDayOpened.technicians];
    newTechnicians[index] = {
      ...newTechnicians[index],
      [name]: value,
    };
    updateOpenedGuardDay({
      ...guardDayOpened,
      technicians: [...newTechnicians],
    });
  };

  const isValid = (value) => {
    return (
      value !== null && value !== undefined && JSON.stringify(value) !== "{}"
    );
  };

  return (
    <Grid
      container
      flex-direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item md={2}>
        <TeachersMenu
          initialValue={initialTeacher}
          list={techniciansInGuardDay}
          name="técnico"
          index={index}
        />
      </Grid>
      <Grid
        item
        md={3 + 1 / 2}
        sx={{
          /* overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis", */
          background: "cyan",
        }}
      >
        <CoursesMenu
          initialValue={initialCourse}
          list={coursesGuardDay}
          name="sin curso"
          index={index}
        />
      </Grid>
      <Grid
        item
        md={2}
        sx={{
          visibility:
            !isValid(initialCourse) || initialCourse?.title === "SIN CURSO"
              ? "hidden"
              : "visible",
        }}
      >
        <LabelButton
          initialValue={guardDayOpened.technicians[index].isInClientWorkplace}
          textOn="en cliente"
          textOff="en oficina"
          onLabelChange={onLabelChange}
          name="isInClientWorkplace"
        />
      </Grid>
      <Grid
        item
        md={2}
        sx={{
          visibility:
            !isValid(initialCourse) || initialCourse?.title === "SIN CURSO"
              ? "hidden"
              : "visible",
        }}
      >
        <LabelButton
          initialValue={guardDayOpened.technicians[index].isProvisional}
          textOn="confirmado"
          textOff="provisional"
          onLabelChange={onLabelChange}
          name="isProvisional"
        />
      </Grid>
      <Grid
        item
        md={2}
        sx={{
          visibility:
            !isValid(initialCourse) || initialCourse?.title === "SIN CURSO"
              ? "hidden"
              : "visible",
        }}
      >
        <LabelButton
          initialValue={guardDayOpened.technicians[index].isCancelled}
          textOn="cancelado"
          textOff="vigente"
          onLabelChange={onLabelChange}
          name="isCancelled"
        />
      </Grid>
      <Grid item md={1 / 2}>
        <IconButton onClick={() => onDeleteItem(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
