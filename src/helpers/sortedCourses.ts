import { Course } from "../interfaces/course";

export const sortedCourses = (courses: Course[]) => {
  let newCourses: Course[] = [...courses];
  let result: Course[] = [];

  let sinCursoIndex: number | -1 = newCourses.findIndex(
    (course: Course): boolean => course.title === "SIN CURSO"
  );

  let sinCursoCourse; //este
  if (sinCursoIndex !== undefined && sinCursoIndex !== null)
    sinCursoCourse = newCourses.splice(sinCursoIndex, 1);

  const compareItems = (course1: Course, course2: Course): 0 | 1 | -1 => {
    if (course1.title.toUpperCase() < course2.title.toUpperCase()) return -1;
    if (course1.title.toUpperCase() > course2.title.toUpperCase()) return 1;
    return 0;
  };

  const getNewCourses = (
    courses: Course[],
    flc: boolean,
    frequent: boolean
  ): Course[] => {
    let coursesSlice: Course[] = [];
    courses.forEach((course: Course): void => {
      if (course.flc === flc && course.frequent === frequent)
        coursesSlice.push(course);
    });
    return coursesSlice;
  };

  let flcFrequentCourses: Course[] = getNewCourses(newCourses, true, true);
  let noFlcFrequentCourses: Course[] = getNewCourses(newCourses, false, true);
  let flcNoFrequentCourses: Course[] = getNewCourses(newCourses, true, false);
  let noFlcNoFrequentCourses: Course[] = getNewCourses(
    newCourses,
    false,
    false
  );

  if (!!flcFrequentCourses) {
    flcFrequentCourses.sort(compareItems);
    //result.push(flcFrequentCourses);
    result.concat(flcFrequentCourses);
  }

  if (!!noFlcFrequentCourses) {
    noFlcFrequentCourses.sort(compareItems);
    //result.push(noFlcFrequentCourses);
    result.concat(noFlcFrequentCourses);
  }

  if (!!flcNoFrequentCourses) {
    flcNoFrequentCourses.sort(compareItems);
    //result.push(flcNoFrequentCourses);
    result.concat(flcNoFrequentCourses);
  }
  if (!!noFlcNoFrequentCourses) {
    noFlcNoFrequentCourses.sort(compareItems);
    //result.push(noFlcNoFrequentCourses);
    result.concat(noFlcNoFrequentCourses);
  }

  if (!!sinCursoCourse) {
    !!sinCursoIndex && result.unshift(sinCursoCourse[0]);
  }

  //  result.unshift(sinCursoCourse[0]);

  //return result.flat();
  return result;
};
