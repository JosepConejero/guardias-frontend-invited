import { Box, Card, Divider, Grid, Typography } from "@mui/material";
//import { monthNames } from "../../helpers";
import "../../styles.css";
import { useSelector } from "react-redux";
import { useGuardDayInformation } from "../../hooks/useGuardDayInformation";
import { TechniciansLine } from "./TechniciansLine";
import { CoursesLine } from "./CoursesLine";
import { SomethingBelowLine } from "./SomethingBelowLine";
import { dateCompare } from "../../helpers/dateComparator";

export const Day = ({
  date: { day, month, year },
  dayOfWeekText,
  onDayClick,
  guardDayInformation,
}) => {
  const { daysInWeek } = useSelector((state) => state.month);
  //monthNames[month]
  //  console.log(guardDayInformation);

  let backgroundColour,
    backgroundColourHeader,
    borderColourBox,
    borderColourCard;

  switch (dateCompare(year, month, day)) {
    case 0:
      borderColourCard = "grey";
      borderColourBox = "grey";
      backgroundColourHeader = "#DAA520";
      backgroundColour = "#FFD700";
      break;
    case -1:
      borderColourCard = "grey";
      borderColourBox = "grey";
      backgroundColourHeader = "lightgrey";
      backgroundColour = "lightgrey";
      break;
    case -2:
      borderColourCard = "grey";
      borderColourBox = "grey";
      backgroundColourHeader = "lightgrey";
      backgroundColour = "lightgrey";
      break;
    case 1:
      borderColourCard = "grey";
      //borderColourBox = "grey";
      backgroundColourHeader = "lightgrey";
      backgroundColour = "white";
      break;
    default:
      borderColourCard = "grey";
      borderColourBox = "grey";
      backgroundColourHeader = "white";
      backgroundColour = "white";
  }

  const {
    isHoliday,
    isOneLine,
    isOneLineAndBottom,
    isThereSomethingBelow,
    isTwoLines,
    isTwoLinesAndBottom,
    isThreeLines,
    isThreeLinesAndBottom,
  } = useGuardDayInformation(guardDayInformation);

  /* const beforeTodayBackgroundColour = "white";
  const todayBackgroundColour = "white";
  const afterTodayBackgroundColour = "white"; */

  const handleDayClick = () => onDayClick(day, month, year);

  return (
    <>
      <Card
        variant="outlined"
        /* sx={{ width: 100, height: 110, boxShadow: 4 }} */
        sx={{
          width: daysInWeek === 6 ? 135 : 165,
          height: 110,
          boxShadow: 3,
          bgcolor: backgroundColourHeader,
          border: `1px ${borderColourCard} solid`,
        }}
        onClick={handleDayClick}
      >
        <Box
          sx={{ display: "flex", bgcolor: backgroundColourHeader }}
          justifyContent="space-between"
        >
          <Typography
            sx={{
              fontSize: 12,
              pl: 1 / 2,
              color: "normalText.main",
              fontWeight: "bold",
            }}
          >
            {dayOfWeekText.toUpperCase()}
          </Typography>
          <Typography
            sx={{ fontSize: 12, pr: 1 / 2, color: "blue", fontWeight: "bold" }}
          >
            {day}
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "grey" }} />
        {isHoliday ? (
          <Grid
            container
            sx={{
              background: "grey",
              height: "90px",
              //borderRadius: "5px",
              border: `1px ${borderColourBox} solid`,
            }}
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ color: "white", fontWeight: "bold" }}>
              FIESTA
            </Typography>
          </Grid>
        ) : (
          /* <Box sx={{ visibility: isHoliday ? "hidden" : "" }}> */
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{
              height: "90px",
              //borderRadius: "5px",
              position: "relative",
              bgcolor: backgroundColour,
              // border: `1px ${borderColourBox} solid`,
            }}
          >
            {isOneLine && (
              <TechniciansLine
                backgroundColour={backgroundColour}
                guardDayInformation={guardDayInformation}
              />
            )}
            {isOneLineAndBottom && (
              <>
                <TechniciansLine
                  offSet={-2}
                  guardDayInformation={guardDayInformation}
                />
                {/* <SomethingBelowLine /> */}
              </>
            )}
            {isTwoLines && (
              <>
                <TechniciansLine guardDayInformation={guardDayInformation} />
                <CoursesLine guardDayInformation={guardDayInformation} />
              </>
            )}
            {isTwoLinesAndBottom && (
              <>
                <TechniciansLine
                  offSet={-1}
                  guardDayInformation={guardDayInformation}
                />
                <CoursesLine guardDayInformation={guardDayInformation} />
              </>
            )}
            {isThreeLines && (
              <>
                <TechniciansLine guardDayInformation={guardDayInformation} />
                <CoursesLine guardDayInformation={guardDayInformation} />
              </>
            )}
            {isThreeLinesAndBottom && (
              <>
                <TechniciansLine
                  offSet={-2}
                  guardDayInformation={guardDayInformation}
                />
                <CoursesLine guardDayInformation={guardDayInformation} />
              </>
            )}

            {isThereSomethingBelow && (
              <SomethingBelowLine guardDayInformation={guardDayInformation} />
            )}
          </Grid>
        )}
      </Card>
    </>
  );
};
