import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    isLoadingCourses: true,
    courses: [],
  },
  reducers: {
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
    onDeleteCourse: (state) => {
      /*  if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      } else {
        console.log("no hay notas activas");
      } */
    },
  },
});

export const { onAddNewCourse, onUpdateCourse, onLoadCourses, onDeleteCourse } =
  courseSlice.actions;
