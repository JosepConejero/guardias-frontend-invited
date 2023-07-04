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

export const UsersGuardsBoxItem = ({ onDeleteItem, technician, index }) => {
  const { guardDayOpened, techniciansInGuardDay, updateOpenedGuardDay } =
    useGuardDayStore();
  const { getTeacherById } = useAppUsersStore();
  const { getCourseById } = useCoursesStore();

  const { courses } = useSelector((state) => state.course);
  // const coursesGuardDay = [...sortedCourses(courses)];

  let initialTeacher = getTeacherById(
    guardDayOpened.technicians[index].technicianId
  );

  //que aquí compruebe si está el curso "sin curso" y si no, que lo cree
  const initialCourse = getCourseById(
    courses,
    guardDayOpened.technicians[index].courseId
  );

  //console.log(sortedTechnicians(techniciansInGuardDay));
  //console.log(sortedCourses(courses));
  //console.log(technician.uniqueId);

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
      //sx={{ border: "1px black solid" }}
    >
      <Grid
        item
        md={2}
        //sx={{ border: "1px black solid" }}
      >
        <TeachersMenu
          initialValue={initialTeacher}
          list={sortedTechnicians(techniciansInGuardDay)} //aquí podría haber un useMemo q se recalculara cuando cambiaran los técnicos del techniciansOut
          name="técnico"
          index={index}
        />
      </Grid>
      <Grid
        item
        md={7}
        sx={
          {
            //background: "cyan",
            // border: "1px black solid",
          }
        }
      >
        <CoursesMenu
          initialValue={initialCourse}
          //list={coursesGuardDay}
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
          // border: "1px black solid",
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

      <Grid item md={1 / 2}>
        <IconButton
          sx={{ color: "#CF0000" /* border: "1px black solid" */ }}
          //onClick={() => onDeleteItem(guardDayOpened.technicians[index]._id)}
          onClick={() => onDeleteItem(technician.uniqueId)}
          /*  onClick={() => onDeleteItem(index)} */
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
