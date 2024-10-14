import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewCourse,
  onDeleteCourse,
  onLoadCourses,
  onSetActiveCourse,
  onSetInactiveCourse,
  onUpdateCourse,
  onEmptyCourses,
  onSetDeletingCourse,
} from "../store/course/courseSlice";
import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";
import { useState } from "react";
import { Course } from "../interfaces";
import { RootState } from "../store";

interface UseCoursesStoreReturnTypes {
  courses: Course[];
  activeCourse: Course;
  isSaving: boolean;
  isDeletingCourse: boolean;
  setActiveCourse: (course: Course) => void;
  setInactiveCourse: () => void;
  startSavingCourse: (course: Course) => Promise<void>;
  startLoadingCourses: () => Promise<void>;
  startDeletingCourse: (course: Course) => Promise<void>;
  getCourseById: (courses: Course[], courseId: string) => Course;
  emptyCourses: () => void;
  courseTitleById: (id: string) => string;
}

export const useCoursesStore = () => {
  const dispatch = useDispatch();
  const { courses, activeCourse, isDeletingCourse } = useSelector(
    (state: RootState) => state.course
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const setActiveCourse = (course: Course): void => {
    dispatch(onSetActiveCourse(course));
  };

  const setInactiveCourse = (): void => {
    dispatch(onSetInactiveCourse());
  };

  const startLoadingCourses = async (): Promise<void> => {
    try {
      const { data } = await calendarApi.get("/courses");
      dispatch(onLoadCourses(data.cursos));
    } catch (error: any) {
      ///any
      console.log("Error cargando cursos");
      console.log(error);
    }
  };

  const startSavingCourse = async (course: Course): Promise<void> => {
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
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        "Error al guardar o actualizar un curso",
        error.response.data?.msg,
        "error"
      );
    }
  };

  const startDeletingCourse = async (course: Course): Promise<void> => {
    try {
      dispatch(onSetDeletingCourse(true));
      await calendarApi.delete(`/courses/${course.id}`);
      dispatch(onDeleteCourse(course));
      dispatch(onSetDeletingCourse(false));
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        "Error al eliminar un curso",
        error.response.data?.msg,
        "error"
      );
    }
  };

  const getCourseById = (courses: Course[], courseId: string): Course => {
    let course: Course = {} as Course;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].id === courseId) {
        course = { ...courses[i] };
      }
    }
    return course;
  };

  const getCourseTitleById = (courses: Course[], courseId: string) => {
    let course = {} as Course;
    if (courses) {
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === courseId) {
          course = { ...courses[i] };
        }
      }
    }
    return course?.title;
  };

  const courseTitleById = (id: string): string =>
    getCourseTitleById(courses, id);

  const emptyCourses = (): void => {
    dispatch(onEmptyCourses());
  };

  return {
    //properties
    courses,
    activeCourse,
    isSaving,
    isDeletingCourse,
    //methods
    setActiveCourse,
    setInactiveCourse,
    startSavingCourse,
    startLoadingCourses,
    startDeletingCourse,
    getCourseById,
    emptyCourses,
    courseTitleById,
  } as UseCoursesStoreReturnTypes;
};
