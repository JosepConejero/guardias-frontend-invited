//import { useAppUsersStore } from "./useAppUsersStore";
import { useCalendarStore } from "./useCalendarStore";

export const useStatisticsData = () => {
  const { guardDays, showedMonth } = useCalendarStore();

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
    //console.log(showedMonth);
    let result = [];

    guardDays?.forEach((guardDay) => {
      if (
        guardDay.simpleDate.month === showedMonth.month &&
        guardDay.simpleDate.year === showedMonth.year
      ) {
        guardDay.technicians?.forEach((technician) => {
          /*  if (result.includes(technician.technicianId)) {
          } */
          if (JSON.stringify(result) === "[]") {
            result.push({
              technicianId: technician.technicianId,
              totalGuards: 1,
              totalFlcs: technician.courseId !== null ? 1 : 0,
            });
          } else {
            //console.log("solo lo hace 19 veces");
            //if (!isInResult(result, technician.technicianId)) {
            const position = isInResult(result, technician.technicianId);
            //console.log(position);
            if (position === -1) {
              result = [
                ...result,
                {
                  technicianId: technician.technicianId,
                  totalGuards: 1,
                  totalFlcs: technician.courseId !== null ? 1 : 0,
                },
              ];
              /*  result.push({
                technicianId: technician.technicianId,
                totalGuards: 1,
                totalFlcs: technician.courseId !== null ? 1 : 0,
              }); */
            } else {
              //console.log("result[position]: ", result[position]);
              result[position] = {
                ...result[position],
                totalGuards: result[position].totalGuards + 1,
                //totalGuards: 2000,
                totalFlcs:
                  technician.courseId !== null
                    ? result[position].totalFlcs + 1
                    : result[position].totalFlcs,
              };
              //result= [...result, total]
            }
          }
        });
        //console.log(guardDay.simpleDate.day);
        /*  console.log(
          guardDay.simpleDate.day,
          guardDay.simpleDate.month,
          guardDay.simpleDate.year
        ); */
      }
    });
    //console.log("result: ", result);
    return result;
  };

  /*


if (JSON.stringify(result)!==[]) {

  if (technician.technicianId está) { sumar 1 a guardias }
  else result.push({technicianId: technician.technicianId, totalGuards: 1, totalFlcs: 0})
}




*/

  const guardsAndFlcsStatistics = getGuardsAndFlcsData(guardDays, showedMonth);

  return {
    guardsAndFlcsStatistics, // [{technicianId, totalGuards, totalFlcs}]
  };
};
