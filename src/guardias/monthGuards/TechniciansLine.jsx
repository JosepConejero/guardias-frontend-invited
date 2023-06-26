import { Stack, Typography } from "@mui/material";
import { useGuardDayInformation } from "../../hooks/useGuardDayInformation";
import { useSelector } from "react-redux";

export const TechniciansLine = ({
  offSet = 0,
  backgroundColour,
  guardDayInformation,
}) => {
  const { daysInWeek } = useSelector((state) => state.month);
  const {
    guardTechnicians,
    isThereAFirstTechnician,
    isThereASecondTechnician,
  } = useGuardDayInformation(guardDayInformation);

  let firstGuardTechnician = {};
  let secondGuardTechnician = {};

  const fontSizeIfDaysInWeek = daysInWeek === 6 ? 11 : 14;

  let techniciansLine = <></>;

  if (isThereASecondTechnician) {
    [firstGuardTechnician, secondGuardTechnician] = guardTechnicians;
    techniciansLine = (
      <Stack
        direction="row"
        mt={offSet}
        width={daysInWeek === 6 ? "auto" : "auto"}
        sx={{
          textAlign: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
        //mt={-2}
        //mt={1 / 4}
        //sx={{ border: "1px black solid" }}
        //sx={a}
      >
        <Typography
          sx={{
            //mt: offSet,
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
            // mt: offSet,
            fontSize: fontSizeIfDaysInWeek,
            fontWeight: "bold",
            color: "normalText.main",
          }}
        >
          &nbsp;/&nbsp;
        </Typography>

        <Typography
          sx={{
            //mt: offSet,
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
          width={daysInWeek === 6 ? "auto" : "auto"}
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
            //border: "1px black solid",
            /*   textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis", */
          }}
        >
          {firstGuardTechnician.shortName}
        </Typography>
      </Stack>
    );
  }

  return <>{techniciansLine}</>;
};
