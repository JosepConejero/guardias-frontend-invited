import { Grid, IconButton } from "@mui/material";
import { LabelButton } from "./LabelButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { useAppUsersStore } from "../../../hooks/useAppUsersStore";
import TeachersMenu from "./TeachersMenu";
import CoursesMenu from "./CoursesMenu";
import { useSelector } from "react-redux";
import { useCoursesStore } from "../../../hooks/useCoursesStore";
import { sortedTechnicians } from "../../../helpers/sortedTechnicians";
import { sortedCourses } from "../../../helpers/sortedCourses";

export const UsersGuardsBoxItem = ({ technician, index, onDeleteItem }) => {
  const { guardDayOpened, techniciansInGuardDay, updateOpenedGuardDay } =
    useGuardDayStore();
  const { getTeacherById } = useAppUsersStore();
  const { getCourseById } = useCoursesStore();

  const { courses } = useSelector((state) => state.course);

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
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      pr={1}
    >
      <Grid item md={2}>
        <TeachersMenu
          initialValue={initialTeacher}
          list={sortedTechnicians(techniciansInGuardDay)} //aquí podría haber un useMemo q se recalculara cuando cambiaran los técnicos del techniciansOut
          name="técnico"
          index={index}
        />
      </Grid>

      <Grid item md={7}>
        <CoursesMenu
          initialValue={initialCourse}
          list={sortedCourses(courses)}
          name="sin curso"
          index={index}
        />
      </Grid>

      <Grid
        item
        md={2 + 1 / 2}
        sx={{
          visibility:
            !isValid(initialCourse) || initialCourse?.title === "SIN CURSO"
              ? "hidden"
              : "visible",
        }}
      >
        <LabelButton
          labelValue={guardDayOpened.technicians[index].isInClientWorkplace}
          textOn="en cliente"
          textOff="en oficina"
          onLabelChange={onLabelChange}
          name="isInClientWorkplace"
          technician={technician}
        />
      </Grid>

      <Grid item md={1 / 2}>
        <IconButton
          sx={{ color: "#CF0000" }}
          onClick={() => onDeleteItem(technician.uniqueId)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
