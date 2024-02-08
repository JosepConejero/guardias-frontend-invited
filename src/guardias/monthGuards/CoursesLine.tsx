import { Stack, Typography } from "@mui/material";
import { useGuardDayInformation } from "../../hooks/useGuardDayInformation";

export const CoursesLine = ({ guardDayInformation }) => {
  const { courseList } = useGuardDayInformation(guardDayInformation);

  const fontSizeIfDaysInWeek = 14;

  let coursesLine = <></>;

  if (courseList.length === 1) {
    coursesLine = (
      <Stack
        direction="column"
        sx={{
          width: 162,
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
        sx={{
          width: 162,
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
