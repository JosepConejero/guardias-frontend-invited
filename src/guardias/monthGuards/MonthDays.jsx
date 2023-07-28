/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Grid } from "@mui/material";
import { Day } from "./Day";
import { isWeekend, isSunday } from "../../helpers/myCalendar";

import { useSelector } from "react-redux";
import { DayModal } from "../modals/DayModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { getDayOfWeekText } from "../../helpers/dayOfWeek";
import { BasicModal } from "../../guardias/modals/basicModal/BasicModal";

export const MonthDays = ({ showedDays }) => {
  const { isDayModalOpen, openDayModal, closeDayModal } = useUiStore();
  const { setActiveGuardDay, guardDayInformation } = useCalendarStore();

  const { daysInWeek } = useSelector((state) => state.month);

  const onDayClick = (day, month, year) => {
    // console.log(day, month, year);
    setActiveGuardDay({ day, month, year });
    openDayModal();
  };

  return (
    <>
      <Grid
        container
        /*  justify-content="center" */
        //columns={6}
        alignItems="center"
        justifyContent="center"
        //spacing={0.5}
        spacing={{ xs: 2, md: 0 }}
        sx={{
          maxWidth: daysInWeek === 6 ? "1300px" : "900px",
          margin: "auto",

          //width: 'auto',
          //bgcolor: "green",
        }}
        //width: { sm: 1300 },
      >
        {showedDays.map((date, index) => {
          if (daysInWeek === 6 && !isSunday(index)) {
            return (
              <Grid item key={index} sx={{ m: 1 / 2 }}>
                <Day
                  date={date}
                  dayOfWeekText={getDayOfWeekText(index)}
                  onDayClick={onDayClick}
                  guardDayInformation={guardDayInformation(date)}
                />
              </Grid>
            );
          }
          if (daysInWeek === 5 && !isWeekend(index)) {
            return (
              <Grid item key={index} sx={{ m: 1 / 2 }}>
                <Day
                  date={date}
                  dayOfWeekText={getDayOfWeekText(index)}
                  onDayClick={onDayClick}
                  guardDayInformation={guardDayInformation(date)}
                />
              </Grid>
            );
          }
        })}
      </Grid>

      {/* <DayModal /> */}
      <BasicModal isOpen={isDayModalOpen} closeModal={closeDayModal}>
        <DayModal closeModal={closeDayModal} />
      </BasicModal>
    </>
  );
};
