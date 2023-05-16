import { useDispatch, useSelector } from "react-redux";
import { onLoadCourses } from "../store/course/courseSlice";
import calendarApi from "../api/calendarApi";

export const useCoursesStore = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);

  const startLoadingCourses = async () => {
    console.log("entra aquí");
    try {
      const { data } = await calendarApi.get("/courses");
      dispatch(onLoadCourses(data.cursos));
      //console.log("undefined aquí", data.cursos);
    } catch (error) {
      console.log("Error cargando cursos");
      console.log(error);
    }
  };

  const startDeletingCourse = async () => {
    console.log("empieza a borrar un curso");
  };

  return {
    //properties
    courses,
    //methods
    startLoadingCourses,
    startDeletingCourse,
  };
};
