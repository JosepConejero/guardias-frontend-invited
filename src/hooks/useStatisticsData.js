import { useCalendarStore } from "./useCalendarStore";

export const useStatisticsData = () => {
  const { guardDays, showedMonth } = useCalendarStore();

  const getGuardsAndFlcsData = (guardDays, showedMonth) => {
    const result = [];
    //const linea = {}
    guardDays.forEach((guardDay) => {
      guardDay.technicians.forEach((technician) => {
        if (result.includes(technician.technicianId)) {
        }
      });
    });

    return result;
  };

  const guardsAndFlcsStatistics = getGuardsAndFlcsData(guardDays, showedMonth);

  return {
    guardsAndFlcsStatistics, // [{technician, totalGuards, totalFlcs}]
  };
};
