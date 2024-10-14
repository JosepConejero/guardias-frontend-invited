export interface Course {
  title: string;
  frequent: boolean;
  flc: boolean;
  id?: string;
}

export interface DayCourse {
  courseTitle: string;
  isExternal: boolean;
  isFLC: boolean;
  isInClientWorkplace: boolean;
  isThereCourse: boolean;
  shortName: string;
}
