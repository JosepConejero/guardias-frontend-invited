import { useSelector } from "react-redux";
import { sortArrayOfObjectsByProperty } from "../helpers/sortArrayOfObjectsByField";
import { useAppUsersStore } from "./useAppUsersStore";
import { useCalendarStore } from "./useCalendarStore";
import { useCoursesStore } from "./useCoursesStore";
import { officeDate } from "../helpers";
import { RootState } from "../store";
import {
  EventGuardDay,
  SimpleDate,
  TechnicianStatistics,
  DayTechnician,
} from "../interfaces";
import { ShowedMonthType } from "../types";

export type TechniciansOutNameDaysType = {
  name: string;
  days: number | string;
};

export type FiveDayScopeType = {
  week: number[];
  techniciansOut: TechniciansOutNameDaysType[];
};

export type TechniciansDaysType = {
  [key: string]: number[];
};

export type TechniciansDaysNumberType = {
  [key: string]: number;
};

export interface UseStatisticsDataReturnTypes {
  guardsAndFlcsStatisticsSortedByShortName: TechnicianStatistics[];
  guardsAndFlcsStatisticsSortedByTotalGuards: TechnicianStatistics[];
  guardsAndFlcsStatisticsSortedByTotalFlcs: TechnicianStatistics[];
  absencesStatistics: FiveDayScopeType[];
  isThereSomeTechnicianOut: (dayData: FiveDayScopeType[]) => boolean;
}

export const useStatisticsData = () => {
  const { showedDate } = useSelector((state: RootState) => state.calendar);

  const { guardDays, showedMonth } = useCalendarStore();
  const { courseTitleById } = useCoursesStore();
  const { technicianShortNameById } = useAppUsersStore();

  const isInResult = (
    technicians: TechnicianStatistics[],
    technicianId: string
  ): number => {
    let isIncluded = -1;
    technicians.forEach((technician: TechnicianStatistics, index: number) => {
      if (technician.technicianId === technicianId) {
        isIncluded = index;
      }
    });
    return isIncluded;
  };

  const getGuardsAndFlcsData = (
    guardDays: EventGuardDay[],
    showedMonth: ShowedMonthType
  ): TechnicianStatistics[] => {
    let result: TechnicianStatistics[] = [];

    guardDays?.forEach((guardDay: EventGuardDay) => {
      if (
        guardDay.simpleDate.month === showedMonth.month &&
        guardDay.simpleDate.year === showedMonth.year
      ) {
        guardDay.technicians?.forEach((technician: DayTechnician) => {
          if (JSON.stringify(result) === "[]") {
            result.push({
              technicianId: technician.technicianId,
              shortName: technicianShortNameById(technician.technicianId),
              totalGuards: 1,
              totalFlcs:
                technician.courseId !== null &&
                courseTitleById(technician.courseId) !== "SIN CURSO"
                  ? 1
                  : 0,
            });
          } else {
            const position = isInResult(result, technician.technicianId);
            if (position === -1) {
              result = [
                ...result,
                {
                  technicianId: technician.technicianId,
                  shortName: technicianShortNameById(technician.technicianId),
                  totalGuards: 1,
                  totalFlcs:
                    technician.courseId !== null &&
                    courseTitleById(technician.courseId) !== "SIN CURSO"
                      ? 1
                      : 0,
                },
              ];
            } else {
              result[position] = {
                ...result[position],
                totalGuards: result[position].totalGuards + 1,
                totalFlcs:
                  technician.courseId !== null &&
                  courseTitleById(technician.courseId) !== "SIN CURSO"
                    ? result[position].totalFlcs + 1
                    : result[position].totalFlcs,
              };
            }
          }
        });
      }
    });
    return result;
  };

  const guardsAndFlcsStatisticsSortedByShortName = sortArrayOfObjectsByProperty(
    getGuardsAndFlcsData(guardDays, showedMonth),
    "shortName"
  );

  const guardsAndFlcsStatisticsSortedByTotalGuards =
    sortArrayOfObjectsByProperty(
      getGuardsAndFlcsData(guardDays, showedMonth),
      "totalGuards"
    );

  const guardsAndFlcsStatisticsSortedByTotalFlcs = sortArrayOfObjectsByProperty(
    getGuardsAndFlcsData(guardDays, showedMonth),
    "totalFlcs"
  );

  const techniciansInTechniciansOut = ({
    day,
    month,
    year,
  }: SimpleDate): TechniciansDaysNumberType => {
    let result: TechniciansDaysNumberType = {};
    let found: boolean = false;
    let index: number = 0;

    let techniciansOutDays: TechniciansDaysNumberType = {};
    while (found === false && index < guardDays.length) {
      if (
        guardDays[index].simpleDate.day === day &&
        guardDays[index].simpleDate.month === month &&
        guardDays[index].simpleDate.year === year
      ) {
        found = true;

        guardDays[index].techniciansOut.forEach((technician) => {
          let technicianName = technicianShortNameById(technician.technicianId);
          techniciansOutDays[technicianName] = day;
        });

        result = techniciansOutDays;
      }
      index++;
    }
    return result;
  };

  const getAbsencesData = () => {
    const showedDays: SimpleDate[] = officeDate(
      showedDate.getFullYear(),
      showedDate.getMonth()
    );

    let dayData: FiveDayScopeType[] = [];
    let monthScopes: SimpleDate[][] = [];
    let weekScope: SimpleDate[] = [];
    let monthScopesTogether: SimpleDate[] = [];

    // 0-4    5   6
    // 7-11   12  13
    // 14-18  19  20
    // 21-25  26  27
    // 28-32  33  34
    // 35-39  40  41

    showedDays.forEach((day: SimpleDate, index: number) => {
      if ([6, 13, 20, 27, 34, 41].includes(index)) {
        monthScopes.push(weekScope);
        weekScope = [];
      }
      if (![5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41].includes(index)) {
        weekScope.push(day);
        monthScopesTogether.push(day);
      }
    });

    let techniciansDays: TechniciansDaysType = {};
    let week: number[] = [];

    monthScopesTogether?.forEach((dayScope: SimpleDate, index: number) => {
      const technicians = techniciansInTechniciansOut(dayScope);
      week.push(dayScope.day);

      Object.entries(technicians).forEach(
        ([key, value]: [key: string, value: number]) => {
          if (!techniciansDays[key]) {
            techniciansDays[key] = [];
          }
          techniciansDays[key] = [...techniciansDays[key], value];
        }
      );

      if ([4, 9, 14, 19, 24, 29].includes(index)) {
        let techniciansOut: TechniciansOutNameDaysType[] = [];
        let techniciansOutItem: TechniciansOutNameDaysType =
          {} as TechniciansOutNameDaysType;
        Object.entries(techniciansDays).forEach(
          ([key, value]: [key: string, value: number[]]) => {
            techniciansOutItem.name = key;
            techniciansOutItem.days = value.join(", ");
            techniciansOut.push(techniciansOutItem);
            techniciansOutItem = {} as TechniciansOutNameDaysType;
          }
        );

        let fiveDaysScope: FiveDayScopeType = {} as FiveDayScopeType;
        fiveDaysScope.week = week;
        week = [];
        fiveDaysScope.techniciansOut = techniciansOut;
        techniciansOut = [];

        techniciansDays = {};
        dayData.push(fiveDaysScope);
      }
    });
    return dayData;
  };

  const absencesStatistics = getAbsencesData();

  // const isThereSomeTechnicianOut = (dayData: EventGuardDay[]): boolean => {
  const isThereSomeTechnicianOut = (dayData: FiveDayScopeType[]): boolean => {
    let found: boolean = false;
    if (dayData.length === 0) return found;
    for (let i = 0; i < dayData.length; i++) {
      if (dayData[i].techniciansOut.length > 0) found = true;
    }
    return found;
  };

  return {
    guardsAndFlcsStatisticsSortedByShortName,
    guardsAndFlcsStatisticsSortedByTotalGuards,
    guardsAndFlcsStatisticsSortedByTotalFlcs,
    absencesStatistics,
    isThereSomeTechnicianOut,
  } as UseStatisticsDataReturnTypes;
};
