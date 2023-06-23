import { Grid, Typography } from "@mui/material";
import { useGuardDayInformation } from "../../hooks/useGuardDayInformation";
import { useSelector } from "react-redux";

export const SomethingBelowLine = ({ guardDayInformation }) => {
  const { daysInWeek } = useSelector((state) => state.month);
  const {
    isThereMoreInformation,
    isSomeExternal,
    isThereOffice2h,
    isSomebodyWithFLC,
    isThereExtraMeeting,
  } = useGuardDayInformation(guardDayInformation);

  const fontSizeIfDaysInWeek = daysInWeek === 6 ? 10 : 13;
  const pxIfDaysInWeek = daysInWeek === 6 ? 6 / 8 : 7 / 8;

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
        //mt={offSet}
        // pt={2}
        sx={{
          //width: "156px",
          width: daysInWeek === 6 ? 128 : 157,
          //width: "100%",
          //border: "1px black solid",
          //mt: 3,
          position: "absolute",
          //height: "25%",
          left: 2,
          bottom: 1,
        }}
      >
        <Grid item>
          <Typography
            // sx={{ position: "fixed", bottom: "10px", left: "10px" }}
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
            //className=""
            sx={{
              borderRadius: "3px",
              bgcolor: "markedText.main",
              color: "white",
              //my: -1,
              px: pxIfDaysInWeek,
              fontWeight: "bold",
              fontSize: fontSizeIfDaysInWeek,
              //height: 16,
            }}
            //sx={{ position: "fixed", bottom: "10px", left: "10px" }}
          >
            {isThereExtraMeeting ? "R" : ""}
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            //className=""
            sx={{
              borderRadius: "3px",
              bgcolor: "markedText.main",
              color: "white",
              //my: -1,
              px: pxIfDaysInWeek,
              fontWeight: "bold",
              fontSize: fontSizeIfDaysInWeek,
              //height: 16,
            }}
            //sx={{ position: "fixed", bottom: "10px", left: "10px" }}
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

              //my: -1,
              px: pxIfDaysInWeek,
              fontWeight: "bold",
              fontSize: fontSizeIfDaysInWeek,
              //height: 16,
            }} // sx={{ position: "fixed", bottom: "10px", left: "10px" }}
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

              // my: -1,
              px: pxIfDaysInWeek,
              fontWeight: "bold",
              fontSize: fontSizeIfDaysInWeek,
              //height: 16,
            }}
            // sx={{ position: "fixed", bottom: "10px", left: "10px" }}
          >
            {isSomebodyWithFLC ? "FLC" : ""}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
