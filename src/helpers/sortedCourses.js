export const sortedCourses = (courses) => {
  let newCourses = [...courses];
  let result = [];

  let sinCursoIndex = newCourses.findIndex(
    (course) => course.title === "SIN CURSO"
  );

  let sinCursoCourse;
  if (sinCursoIndex !== undefined && sinCursoIndex !== null)
    sinCursoCourse = newCourses.splice(sinCursoIndex, 1);

  const compareItems = (course1, course2) => {
    if (course1.title.toUpperCase() < course2.title.toUpperCase()) return -1;
    if (course1.title.toUpperCase() > course2.title.toUpperCase()) return 1;
    return 0;
  };

  const getNewCourses = (courses, flc, frequent) => {
    let coursesSlice = [];
    courses.forEach((course) => {
      if (course.flc === flc && course.frequent === frequent)
        coursesSlice.push(course);
    });
    return coursesSlice;
  };

  let flcFrequentCourses = getNewCourses(newCourses, true, true);
  let noFlcFrequentCourses = getNewCourses(newCourses, false, true);
  let flcNoFrequentCourses = getNewCourses(newCourses, true, false);
  let noFlcNoFrequentCourses = getNewCourses(newCourses, false, false);

  if (!!flcFrequentCourses) {
    flcFrequentCourses.sort(compareItems);
    result.push(flcFrequentCourses);
  }

  if (!!noFlcFrequentCourses) {
    noFlcFrequentCourses.sort(compareItems);
    result.push(noFlcFrequentCourses);
  }

  if (!!flcNoFrequentCourses) {
    flcNoFrequentCourses.sort(compareItems);
    result.push(flcNoFrequentCourses);
  }
  if (!!noFlcNoFrequentCourses) {
    noFlcNoFrequentCourses.sort(compareItems);
    result.push(noFlcNoFrequentCourses);
  }

  !!sinCursoIndex && result.unshift(sinCursoCourse[0]);

  return result.flat();
};
