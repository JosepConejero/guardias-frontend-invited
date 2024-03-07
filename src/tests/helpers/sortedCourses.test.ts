import { sortedCourses } from "../../helpers";

const fourCourses = [
  {
    title: "course 1",
    frequent: false,
    flc: false,
    id: "id1",
  },
  {
    title: "course 2",
    frequent: true,
    flc: false,
    id: "id2",
  },
  {
    title: "course 3",
    frequent: false,
    flc: true,
    id: "id3",
  },
  {
    title: "course 4",
    frequent: true,
    flc: true,
    id: "id4",
  },
];

const fourOrderedCourses = [
  {
    title: "course 4",
    frequent: true,
    flc: true,
    id: "id4",
  },
  {
    title: "course 2",
    frequent: true,
    flc: false,
    id: "id2",
  },
  {
    title: "course 3",
    frequent: false,
    flc: true,
    id: "id3",
  },
  {
    title: "course 1",
    frequent: false,
    flc: false,
    id: "id1",
  },
];

const oneCourse = [
  {
    title: "course 1",
    frequent: false,
    flc: false,
    id: "id1",
  },
];

/* const threeCoursesWithTheSameTitle = [
  {
    title: "course 1",
    frequent: false,
    flc: false,
    id: "id1",
  },
  {
    title: "course 1",
    frequent: false,
    flc: false,
    id: "id2",
  },
  {
    title: "course 1",
    frequent: false,
    flc: false,
    id: "id3",
  },
]; */

describe("Given a sortedCourses function", () => {
  describe("When it's called with an array of courses 'fourCourses'", () => {
    test("Then it doesn't return an unordered array of 'fourCourses'", () => {
      expect(sortedCourses(fourCourses)).not.toStrictEqual(fourCourses);
    });
    test("Then it returns an ordered array of 'fourCourses'", () => {
      expect(sortedCourses(fourCourses)).toStrictEqual(fourOrderedCourses);
    });
  });
  describe("When it's called with an empty array", () => {
    test("It returns an empty array", () => {
      expect(sortedCourses([])).toStrictEqual([]);
    });
  });
  describe("When it's called with a single course", () => {
    test("It returns the same course", () => {
      expect(sortedCourses(oneCourse)).toStrictEqual(oneCourse);
    });
  });
  /*  describe("When it's called with three courses with the same title", () => {
    test("It returns the same array", () => {
      expect(sortedCourses(threeCoursesWithTheSameTitle)).toStrictEqual(
        threeCoursesWithTheSameTitle
      );
    });
  }); */
});
