import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewCourse,
  onDeleteCourse,
  onLoadCourses,
  onSetActiveCourse,
  onSetInactiveCourse,
  onUpdateCourse,
} from "../store/course/courseSlice";
import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";

export const useCoursesStore = () => {
  const dispatch = useDispatch();
  const { courses, activeCourse } = useSelector((state) => state.course);

  const setActiveCourse = (course) => {
    dispatch(onSetActiveCourse(course));
  };

  const setInactiveCourse = () => {
    dispatch(onSetInactiveCourse());
  };

  const startLoadingCourses = async () => {
    try {
      const { data } = await calendarApi.get("/courses");
      dispatch(onLoadCourses(data.cursos));
    } catch (error) {
      console.log("Error cargando cursos");
      console.log(error);
    }
  };

  const startSavingCourse = async (course) => {
    try {
      if (course.id) {
        await calendarApi.put(`/courses/${course.id}`, course);
        dispatch(onUpdateCourse({ ...course }));
        return;
      }
      const { data } = await calendarApi.post("/courses", course);
      dispatch(onAddNewCourse({ ...course, id: data.curso.id }));
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al guardar o actualizar un curso",
        error.response.data?.msg,
        "error"
      );
    }
  };

  const startDeletingCourse = async (course) => {
    try {
      await calendarApi.delete(`/courses/${course.id}`);
      dispatch(onDeleteCourse(course));
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al eliminar un curso",
        error.response.data?.msg,
        "error"
      );
    }
  };

  const getCourseById = (courses, courseId) => {
    let course = {};
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].id === courseId) {
        course = { ...courses[i] };
      }
    }
    return course;
  };

  return {
    //properties
    courses,
    activeCourse,
    //methods
    setActiveCourse,
    setInactiveCourse,
    startSavingCourse,
    startLoadingCourses,
    startDeletingCourse,
    getCourseById,
  };
};
