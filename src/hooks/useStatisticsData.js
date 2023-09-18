import { useSelector } from "react-redux";
import { sortArrayOfObjectsByProperty } from "../helpers/sortArrayOfObjectsByField";
import { useAppUsersStore } from "./useAppUsersStore";
import { useCalendarStore } from "./useCalendarStore";
import { useCoursesStore } from "./useCoursesStore";
import { officeDate } from "../helpers";

export const useStatisticsData = () => {
  const { showedDate } = useSelector((state) => state.calendar);

  const { guardDays, showedMonth } = useCalendarStore();
  const { courseTitleById } = useCoursesStore();
  const { technicianShortNameById } = useAppUsersStore();

  const isInResult = (technicians, technicianId) => {
    let isIncluded = -1;
    technicians.forEach((technician, index) => {
      if (technician.technicianId === technicianId) {
        isIncluded = index;
      }
    });
    return isIncluded;
  };

  const getGuardsAndFlcsData = (guardDays, showedMonth) => {
    let result = [];

    guardDays?.forEach((guardDay) => {
      if (
        guardDay.simpleDate.month === showedMonth.month &&
        guardDay.simpleDate.year === showedMonth.year
      ) {
        guardDay.technicians?.forEach((technician) => {
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

  const techniciansInTechniciansOut = ({ day, month, year }) => {
    let result = [];
    let found = false;
    let index = 0;

    let techniciansOutDays = {};
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
    const showedDays = officeDate(
      showedDate.getFullYear(),
      showedDate.getMonth()
    );
    let dayData = [];
    let monthScopes = [];
    let weekScope = [];
    let monthScopesTogether = [];

    // 0-4    5   6
    // 7-11   12  13
    // 14-18  19  20
    // 21-25  26  27
    // 28-32  33  34
    // 35-39  40  41

    showedDays.forEach((day, index) => {
      if ([6, 13, 20, 27, 34, 41].includes(index)) {
        monthScopes.push(weekScope);
        weekScope = [];
      }
      if (![5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41].includes(index)) {
        weekScope.push(day);
        monthScopesTogether.push(day);
      }
    });

    let techniciansDays = {};
    let week = [];

    monthScopesTogether?.forEach((dayScope, index) => {
      const technicians = techniciansInTechniciansOut(dayScope);
      week.push(dayScope.day);

      Object.entries(technicians).forEach(([key, value]) => {
        if (!techniciansDays[key]) {
          techniciansDays[key] = [];
        }
        techniciansDays[key] = [...techniciansDays[key], value];
      });

      if ([4, 9, 14, 19, 24, 29].includes(index)) {
        let techniciansOut = [];
        let techniciansOutItem = {};
        Object.entries(techniciansDays).forEach(([key, value]) => {
          techniciansOutItem.name = key;
          techniciansOutItem.days = value.join(", ");
          techniciansOut.push(techniciansOutItem);
          techniciansOutItem = {};
        });

        let fiveDaysScope = {};
        fiveDaysScope.week = week;
        week = [];
        fiveDaysScope.techniciansOut = techniciansOut;
        techniciansOut = [];

        techniciansDays = {};
        dayData.push(fiveDaysScope);
      }
    });

    //    console.log({ dayData });

    return dayData;
  };

  const absencesStatistics = getAbsencesData();

  return {
    guardsAndFlcsStatisticsSortedByShortName, // [{technicianId, totalGuards, totalFlcs, shortName}]
    guardsAndFlcsStatisticsSortedByTotalGuards,
    guardsAndFlcsStatisticsSortedByTotalFlcs,
    absencesStatistics,
  };
};
