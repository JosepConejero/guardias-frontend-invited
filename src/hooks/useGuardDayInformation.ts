import { extractItemByProperty } from "../helpers/extractItemByProperty";
import { Course, DayCourse, EventGuardDay, User } from "../interfaces";
import { useAppUsersStore } from "./useAppUsersStore";
import { useCoursesStore } from "./useCoursesStore";

type useGuardDayInformationReturnTypes = {
  guardTechnicians: DayCourse[];
  isHoliday: boolean;
  isThereOffice2h: boolean;
  isThereMoreInformation: boolean;
  isSomeExternal: boolean;
  isSomebodyWithFLC: boolean;
  isThereAFirstTechnician: boolean;
  isThereASecondTechnician: boolean;
  courseList: DayCourse[];
  isOneLine: boolean;
  isOneLineAndBottom: boolean;
  isTwoLines: boolean;
  isTwoLinesAndBottom: boolean;
  isThreeLines: boolean;
  isThreeLinesAndBottom: boolean;
  isThereSomeCourse: boolean;
  isThereSomethingBelow: boolean;
  isThereExtraMeeting: boolean;
};

export const useGuardDayInformation = (guardDayInformation: EventGuardDay) => {
  const { courses }: { courses: Course[] } = useCoursesStore();
  const { appUsers }: { appUsers: User[] } = useAppUsersStore();

  const isHoliday = !!guardDayInformation && guardDayInformation.isHoliday;
  const isThereOffice2h =
    !!guardDayInformation && guardDayInformation.isThereOffice2h;

  let isThereANoteText =
    !!guardDayInformation && guardDayInformation.note !== "";

  const isThereExtraMeeting =
    !!guardDayInformation && guardDayInformation.isThereExtraMeeting;

  let guardTechnicians: DayCourse[] = [];
  let isSomeExternal = false;
  let isSomebodyWithFLC = false;
  let isThereSomeCourse = false;
  let courseList: DayCourse[] = [];

  guardDayInformation?.technicians.forEach((technician) => {
    let newGuardTechnician: DayCourse = {} as DayCourse;
    const { shortName, isExternal } = extractItemByProperty(
      appUsers,
      "id",
      technician.technicianId
    );
    const { title: courseTitle, flc: isFLC } = extractItemByProperty(
      courses,
      "id",
      technician.courseId!
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

  guardTechnicians.forEach((technician: DayCourse) => {
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
    guardTechnicians,
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
  } as useGuardDayInformationReturnTypes;
};
