import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    isLoadingCourses: true,
    courses: [],
    activeCourse: null,
  },
  reducers: {
    onSetActiveCourse: (state, { payload }) => {
      state.activeCourse = payload;
    },
    onSetInactiveCourse: (state) => {
      state.activeCourse = null;
    },
    onAddNewCourse: (state, { payload }) => {
      state.courses.push(payload);
    },
    onUpdateCourse: (state, { payload }) => {
      state.courses = state.courses.map((course) => {
        if (course.id === payload.id) {
          return payload;
        }
        return course;
      });
    },
    onLoadCourses: (state, { payload = [] }) => {
      state.isLoadingCourses = false;
      payload.forEach((course) => {
        const exists = state.courses.some(
          (dbCourse) => dbCourse.id === course.id
        );
        if (!exists) {
          state.courses.push(course);
        }
      });
    },
    onDeleteCourse: (state, { payload }) => {
      state.courses = state.courses.filter(
        (course) => course.id !== payload.id
      );
    },
    onEmptyCourses: (state) => {
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
  onEmptyCourses,
} = courseSlice.actions;
