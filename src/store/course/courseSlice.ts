import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Course } from "../../interfaces";
import { RootState } from "../store";

interface CourseSliceInitialState {
  isLoadingCourses: boolean;
  courses: Course[];
  activeCourse: null | Course;
  isDeletingCourse: boolean;
}

const initialState: CourseSliceInitialState = {
  isLoadingCourses: true,
  courses: [],
  activeCourse: null,
  isDeletingCourse: false,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    onSetActiveCourse: (
      state: RootState,
      { payload }: PayloadAction<Course>
    ) => {
      state.activeCourse = payload;
    },
    onSetInactiveCourse: (state: RootState) => {
      state.activeCourse = null;
    },
    onAddNewCourse: (state: RootState, { payload }: PayloadAction<Course>) => {
      state.courses.push(payload);
    },
    onUpdateCourse: (state: RootState, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.map((course: Course) => {
        if (course.id === payload.id) {
          return payload;
        }
        return course;
      });
    },
    onLoadCourses: (
      state: RootState,
      { payload = [] }: { payload: Course[] }
    ) => {
      state.isLoadingCourses = false;
      payload.forEach((course: Course) => {
        const exists: boolean = state.courses.some(
          (dbCourse: Course) => dbCourse.id === course.id
        );
        if (!exists) {
          state.courses.push(course);
        }
      });
    },
    onDeleteCourse: (state: RootState, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.filter(
        (course: Course) => course.id !== payload.id
      );
    },
    onSetDeletingCourse: (
      state: RootState,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isDeletingCourse = payload;
    },
    onEmptyCourses: (state: RootState) => {
      state.courses = [];
    },
  },
});

export const {
  onSetActiveCourse,
  onSetInactiveCourse,
  onAddNewCourse,
  onUpdateCourse,
  onLoadCourses,
  onDeleteCourse,
  onSetDeletingCourse,
  onEmptyCourses,
} = courseSlice.actions;
