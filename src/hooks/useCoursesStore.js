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
//import { useState } from "react";

export const useCoursesStore = () => {
  const dispatch = useDispatch();
  const { courses, activeCourse } = useSelector((state) => state.course);
  //const [checkboxChecked, setCheckboxChecked] = useState();

  const setActiveCourse = (course) => {
    dispatch(onSetActiveCourse(course));
  };

  const setInactiveCourse = () => {
    dispatch(onSetInactiveCourse());
  };

  //   const handleCheckboxChange = async ({ target }) => {
  //     /*  const { name, value } = target;
  //     setCheckboxChecked({
  //       ...activeCourse,
  //       [name]: value,
  //     });
  //  */
  //     setCheckboxChecked(target.checked);
  //     //await startSavingCourse({ ...course, flc: event.target.checked });
  //     await startSavingCourse({
  //       ...activeCourse,
  //       [target.name]: target.checked,
  //     });
  //   };

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
      //console.log({ data });
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

  return {
    //properties
    courses,
    activeCourse,
    // checkboxChecked,
    //methods
    setActiveCourse,
    setInactiveCourse,
    startSavingCourse,
    startLoadingCourses,
    startDeletingCourse,
    // setCheckboxChecked,
    // handleCheckboxChange,
  };
};
