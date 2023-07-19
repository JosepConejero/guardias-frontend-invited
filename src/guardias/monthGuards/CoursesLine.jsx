import { Stack, Typography } from "@mui/material";
import { useGuardDayInformation } from "../../hooks/useGuardDayInformation";
//import { useSelector } from "react-redux";

export const CoursesLine = ({ /* offSet = 0, */ guardDayInformation }) => {
  //const { daysInWeek } = useSelector((state) => state.month);
  const { courseList } = useGuardDayInformation(guardDayInformation);

  //const fontSizeIfDaysInWeek = daysInWeek === 6 ? 11 : 14;
  const fontSizeIfDaysInWeek = 14;

  let coursesLine = <></>;

  if (courseList.length === 1) {
    coursesLine = (
      <Stack
        direction="column"
        //mt={offSet}
        sx={{
          //width: "162px",
          //width: daysInWeek === 6 ? 135 : 162,
          width: 162,
          //  border: "1px black solid"
        }}
      >
        <Typography
          sx={{
            fontSize: fontSizeIfDaysInWeek,
            px: 1 / 2,
            borderRadius: 1,
            color: "normalText.main",
            fontWeight: "bold",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {courseList[0].courseTitle}
        </Typography>
      </Stack>
    );
  }

  if (courseList.length > 1) {
    coursesLine = (
      <Stack
        //mt={offSet}
        sx={{
          //width: "162px",
          //width: daysInWeek === 6 ? 130 : 162,
          width: 162,
          //  border: "1px black solid"
        }}
      >
        <Typography
          sx={{
            fontSize: fontSizeIfDaysInWeek,
            px: 1 / 2,
            borderRadius: 1,
            color: "normalText.main",
            fontWeight: "bold",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {courseList[0].courseTitle}
        </Typography>

        <Typography
          sx={{
            mt: -1 / 2,
            fontSize: fontSizeIfDaysInWeek,
            fontWeight: "bold",
            px: 1 / 2,
            borderRadius: 1,
            color: "normalText.main",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {courseList[1].courseTitle}
        </Typography>
      </Stack>
    );
  }

  return <>{coursesLine}</>;
};
