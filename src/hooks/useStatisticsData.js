import { sortArrayOfObjectsByProperty } from "../helpers/sortArrayOfObjectsByField";
import { useAppUsersStore } from "./useAppUsersStore";
import { useCalendarStore } from "./useCalendarStore";
import { useCoursesStore } from "./useCoursesStore";

export const useStatisticsData = () => {
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

  return {
    guardsAndFlcsStatisticsSortedByShortName, // [{technicianId, totalGuards, totalFlcs, shortName}]
    guardsAndFlcsStatisticsSortedByTotalGuards,
    guardsAndFlcsStatisticsSortedByTotalFlcs,
  };
};
