import { Box, Card, Divider, Typography } from "@mui/material";
//import { monthNames } from "../../helpers";
import "../../styles.css";
import { useSelector } from "react-redux";

export const Day = ({
  date: { day, month, year },
  dayOfWeekText,
  onDayClick,
  guardDayInformation,
}) => {
  const { daysInWeek } = useSelector((state) => state.month);
  //monthNames[month]

  const handleDayClick = () => onDayClick(day, month, year);

  return (
    <>
      <Card
        variant="outlined"
        /* sx={{ width: 100, height: 110, boxShadow: 4 }} */
        sx={{
          width: daysInWeek === 6 ? 135 : 165,
          height: 110,
          boxShadow: 4,
          /* bgcolor: "yellowgreen", */
        }}
        onClick={handleDayClick}
      >
        <Box sx={{ display: "flex" }} justifyContent="space-between">
          <Typography sx={{ fontSize: 12, pl: 1 / 2, color: "black" }}>
            {dayOfWeekText.toUpperCase()}
          </Typography>
          <Typography
            sx={{ fontSize: 12, pr: 1 / 2, color: "red", fontWeight: "medium" }}
          >
            {day}
          </Typography>
        </Box>
        <Divider sx={{ color: "black" }} />
        <Typography>{guardDayInformation?.note}</Typography>
      </Card>
    </>
  );
};
