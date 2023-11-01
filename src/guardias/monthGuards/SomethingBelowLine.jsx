import { Grid, Typography } from "@mui/material";
import { useGuardDayInformation } from "../../hooks/useGuardDayInformation";

export const SomethingBelowLine = ({ guardDayInformation }) => {
  const {
    isThereMoreInformation,
    isSomeExternal,
    isThereOffice2h,
    isSomebodyWithFLC,
    isThereExtraMeeting,
  } = useGuardDayInformation(guardDayInformation);

  const fontSizeIfDaysInWeek = 13;
  const pxIfDaysInWeek = 7 / 8;

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
        sx={{
          width: 157,
          position: "absolute",
          left: 2,
          bottom: 3,
        }}
      >
        <Grid item>
          <Typography
            sx={{
              borderRadius: "25px",
              bgcolor: "markedText.main",
              color: "yellow",
              px: pxIfDaysInWeek,
              fontWeight: "bold",
              fontSize: fontSizeIfDaysInWeek,
            }}
          >
            {isThereMoreInformation ? "!" : ""}
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            sx={{
              borderRadius: "3px",
              bgcolor: "markedText.main",
              color: "white",
              px: pxIfDaysInWeek,
              fontWeight: "bold",
              fontSize: fontSizeIfDaysInWeek,
            }}
          >
            {isThereExtraMeeting ? "R" : ""}
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            sx={{
              borderRadius: "3px",
              bgcolor: "markedText.main",
              color: "white",
              px: pxIfDaysInWeek,
              fontWeight: "bold",
              fontSize: fontSizeIfDaysInWeek,
            }}
          >
            {isSomeExternal ? "EXT" : ""}
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            sx={{
              borderRadius: "3px",
              bgcolor: "markedText.main",
              color: "white",
              px: pxIfDaysInWeek,
              fontWeight: "bold",
              fontSize: fontSizeIfDaysInWeek,
            }}
          >
            {isThereOffice2h ? "2H" : ""}
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            sx={{
              borderRadius: "3px",
              bgcolor: "flcRelated.main",
              color: "white",
              px: pxIfDaysInWeek,
              fontWeight: "bold",
              fontSize: fontSizeIfDaysInWeek,
            }}
          >
            {isSomebodyWithFLC ? "FLC" : ""}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
