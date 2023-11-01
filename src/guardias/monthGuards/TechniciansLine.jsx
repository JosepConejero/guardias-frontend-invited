import { Stack, Typography } from "@mui/material";
import { useGuardDayInformation } from "../../hooks/useGuardDayInformation";

export const TechniciansLine = ({
  offSet = 0,
  backgroundColour,
  guardDayInformation,
}) => {
  const {
    guardTechnicians,
    isThereAFirstTechnician,
    isThereASecondTechnician,
  } = useGuardDayInformation(guardDayInformation);

  let firstGuardTechnician = {};
  let secondGuardTechnician = {};

  const fontSizeIfDaysInWeek = 14;

  let techniciansLine = <></>;

  if (isThereASecondTechnician) {
    [firstGuardTechnician, secondGuardTechnician] = guardTechnicians;
    techniciansLine = (
      <Stack
        direction="row"
        mt={offSet}
        width={"auto"}
        sx={{
          textAlign: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        <Typography
          sx={{
            fontSize: fontSizeIfDaysInWeek,
            px: 1 / 2,
            borderRadius: 1,
            color: firstGuardTechnician.isThereCourse
              ? "white"
              : "normalText.main",
            bgcolor: firstGuardTechnician.isThereCourse
              ? "red"
              : backgroundColour,
            fontWeight: "bold",
          }}
        >
          {firstGuardTechnician.shortName}
        </Typography>

        <Typography
          sx={{
            fontSize: fontSizeIfDaysInWeek,
            fontWeight: "bold",
            color: "normalText.main",
          }}
        >
          &nbsp;/&nbsp;
        </Typography>

        <Typography
          sx={{
            fontSize: fontSizeIfDaysInWeek,
            fontWeight: "bold",
            px: 1 / 2,
            borderRadius: 1,
            color: secondGuardTechnician.isThereCourse
              ? "white"
              : "normalText.main",
            bgcolor: secondGuardTechnician.isThereCourse
              ? "red"
              : backgroundColour,
          }}
        >
          {secondGuardTechnician.shortName}
        </Typography>
      </Stack>
    );
  }

  if (!isThereASecondTechnician && isThereAFirstTechnician) {
    [firstGuardTechnician] = guardTechnicians;
    techniciansLine = (
      <Stack direction="row">
        <Typography
          mt={offSet}
          width={"auto"}
          sx={{
            fontSize: fontSizeIfDaysInWeek,
            px: 1,
            borderRadius: 1,
            color: firstGuardTechnician.isThereCourse
              ? "white"
              : "normalText.main",
            bgcolor: firstGuardTechnician.isThereCourse
              ? "red"
              : backgroundColour,
            fontWeight: "bold",
          }}
        >
          {firstGuardTechnician.shortName}
        </Typography>
      </Stack>
    );
  }

  return <>{techniciansLine}</>;
};
