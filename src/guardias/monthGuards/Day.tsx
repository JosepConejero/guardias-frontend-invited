import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import "../../styles.css";
import { useGuardDayInformation } from "../../hooks/useGuardDayInformation";
import { TechniciansLine } from "./TechniciansLine";
import { CoursesLine } from "./CoursesLine";
import { SomethingBelowLine } from "./SomethingBelowLine";
import { dateCompare } from "../../helpers/dateComparator";
import { EventGuardDay, SimpleDate } from "../../interfaces";

interface DayProps {
  date: SimpleDate;
  dayOfWeekText: string;
  onDayClick: (day: number, month: number, year: number) => void;
  guardDayInformation: EventGuardDay;
}

export const Day = ({
  date: { day, month, year },
  dayOfWeekText,
  onDayClick,
  guardDayInformation,
}: DayProps): JSX.Element => {
  let backgroundColour: string,
    backgroundColourHeader: string,
    borderColourBox: string,
    borderColourCard: string;

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
      backgroundColourHeader = "#B3B3B3";
      backgroundColour = "lightgrey";
      break;
    case -2:
      borderColourCard = "grey";
      borderColourBox = "grey";
      backgroundColourHeader = "#B3B3B3";
      backgroundColour = "#B3B3B3";
      break;
    case 1:
      borderColourCard = "grey";
      borderColourBox = "grey";
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

  const handleDayClick = (): void => onDayClick(day, month, year);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: 165,
          height: 110,
          boxShadow: 3,
          bgcolor: backgroundColourHeader,
          border: `1px ${borderColourCard} solid`,
          mb: { xs: -2, md: 0 },
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
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{
              height: "90px",
              position: "relative",
              bgcolor: backgroundColour,
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
