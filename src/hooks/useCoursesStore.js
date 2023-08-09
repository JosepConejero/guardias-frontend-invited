import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewCourse,
  onDeleteCourse,
  onLoadCourses,
  onSetActiveCourse,
  onSetInactiveCourse,
  onUpdateCourse,
  onEmptyCourses,
} from "../store/course/courseSlice";
import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";
import { useState } from "react";

export const useCoursesStore = () => {
  const dispatch = useDispatch();
  const { courses, activeCourse } = useSelector((state) => state.course);
  const [isSaving, setIsSaving] = useState(false);

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
      setIsSaving(true);
      if (course.id) {
        await calendarApi.put(`/courses/${course.id}`, course);
        dispatch(onUpdateCourse({ ...course }));
        setIsSaving(false);
        return;
      }
      const { data } = await calendarApi.post("/courses", course);
      dispatch(onAddNewCourse({ ...course, id: data.curso.id }));
      setIsSaving(false);
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

  const getCourseTitleById = (courses, courseId) => {
    let course = {};
    if (courses) {
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === courseId) {
          course = { ...courses[i] };
        }
      }
    }
    return course?.title;
  };

  const courseTitleById = (id) => getCourseTitleById(courses, id);

  const emptyCourses = () => {
    dispatch(onEmptyCourses());
  };

  return {
    //properties
    courses,
    activeCourse,
    isSaving,
    //methods
    setActiveCourse,
    setInactiveCourse,
    startSavingCourse,
    startLoadingCourses,
    startDeletingCourse,
    getCourseById,
    emptyCourses,
    courseTitleById,
  };
};
