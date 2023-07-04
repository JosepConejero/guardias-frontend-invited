import { extractItemByProperty } from "../helpers/extractItemByProperty";
import { useAppUsersStore } from "./useAppUsersStore";
import { useCoursesStore } from "./useCoursesStore";

export const useGuardDayInformation = (guardDayInformation) => {
  //const { courses } = useSelector((state) => state.course);
  // const { appUsers } = useSelector((state) => state.appUser);

  const { courses } = useCoursesStore();
  const { appUsers } = useAppUsersStore();

  const isHoliday = !!guardDayInformation && guardDayInformation.isHoliday;
  const isThereOffice2h =
    !!guardDayInformation && guardDayInformation.isThereOffice2h;

  let isThereANoteText =
    !!guardDayInformation && guardDayInformation.note !== "";

  const isThereExtraMeeting =
    !!guardDayInformation && guardDayInformation.isThereExtraMeeting;

  let guardTechnicians = [];
  let isSomeExternal = false;
  let isSomebodyWithFLC = false;
  let isThereSomeCourse = false;
  let courseList = [];

  guardDayInformation?.technicians.forEach((technician) => {
    let newGuardTechnician = {};
    const { shortName, isExternal } = extractItemByProperty(
      appUsers,
      "id",
      technician.technicianId
    );
    const { title: courseTitle, flc: isFLC } = extractItemByProperty(
      courses,
      "id",
      technician.courseId
    );

    if (isExternal) isSomeExternal = true;

    newGuardTechnician = {
      ...newGuardTechnician,
      shortName,
      isExternal,
      isThereCourse:
        courseTitle !== "SIN CURSO" &&
        courseTitle !== undefined &&
        courseTitle !== null,
      courseTitle:
        courseTitle !== null && courseTitle !== undefined
          ? courseTitle
          : "SIN CURSO",
      isFLC: isFLC !== null && isFLC !== undefined ? isFLC : false,
      isInClientWorkplace: technician.isInClientWorkplace,
    };

    if (newGuardTechnician.isFLC) isSomebodyWithFLC = true;
    if (newGuardTechnician.isThereCourse) isThereSomeCourse = true;

    guardTechnicians = [...guardTechnicians, { ...newGuardTechnician }];
  });

  guardTechnicians.forEach((technician) => {
    if (technician.isThereCourse)
      courseList = [...courseList, { ...technician }];
  });

  const isThereMoreInformation =
    guardTechnicians.length > 2 || isThereANoteText;

  const isThereAFirstTechnician = guardTechnicians.length >= 1;
  const isThereASecondTechnician = guardTechnicians.length >= 2;

  const isThereSomethingBelow =
    isThereMoreInformation ||
    isThereExtraMeeting ||
    isSomeExternal ||
    isThereOffice2h ||
    isSomebodyWithFLC;

  let isOneLine =
    guardTechnicians.length >= 1 &&
    courseList.length === 0 &&
    !isThereSomethingBelow;

  let isOneLineAndBottom =
    guardTechnicians.length >= 1 &&
    courseList.length === 0 &&
    isThereSomethingBelow;

  let isTwoLines =
    guardTechnicians.length >= 1 &&
    courseList.length === 1 &&
    !isThereSomethingBelow;

  let isTwoLinesAndBottom =
    guardTechnicians.length >= 1 &&
    courseList.length === 1 &&
    isThereSomethingBelow;

  let isThreeLines =
    guardTechnicians.length >= 1 &&
    courseList.length > 1 &&
    !isThereSomethingBelow;

  let isThreeLinesAndBottom =
    guardTechnicians.length >= 1 &&
    courseList.length > 1 &&
    isThereSomethingBelow;

  return {
    guardTechnicians, //[{shortname, isExternal, isThereCourse, courseTitle, isFLC, isInClientWorkplace}]
    isHoliday,
    isThereOffice2h,
    isThereMoreInformation,
    isSomeExternal,
    isSomebodyWithFLC,
    isThereAFirstTechnician,
    isThereASecondTechnician,
    courseList,
    isOneLine,
    isOneLineAndBottom,
    isTwoLines,
    isTwoLinesAndBottom,
    isThreeLines,
    isThreeLinesAndBottom,
    isThereSomeCourse,
    isThereSomethingBelow,
    isThereExtraMeeting,
  };
};
