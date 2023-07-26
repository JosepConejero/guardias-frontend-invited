/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import { useUiStore } from "../../hooks/useUiStore";
import { useAuthStore } from "../../hooks";

export const ListItemCourses = ({ course }) => {
  const { openCourseModal } = useUiStore();
  //const [flcChecked, setFlcChecked] = useState(true);
  //const [frequentChecked, setFrequentChecked] = useState(true);
  const { startDeletingCourse, setActiveCourse /* startSavingCourse */ } =
    useCoursesStore();
  const { user } = useAuthStore();

  //const { checkboxValues } = useCheckbox(course); ////

  const handleCourseChange = () => {
    if (user.isDataModifier) {
      setActiveCourse(course);
      openCourseModal();
    }
  };
  /* 
  const handleFlcChange = async (event) => {
    setFlcChecked(event.target.checked);
    //await startSavingCourse({ ...course, flc: event.target.checked });
    await startSavingCourse({
      ...course,
      [event.target.name]: event.target.checked,
    });
  }; */

  /*   const handleFrequentChange = async (event) => {
    setFrequentChecked(event.target.checked);
    //await startSavingCourse({ ...course, frequent: event.target.checked });
    await startSavingCourse({
      ...course,
      [event.target.name]: event.target.checked,
    });
  }; */

  const onDeleteItem = () => {
    //if (user.isDataModifier)
    startDeletingCourse(course);
  };

  useEffect(() => {
    //setFlcChecked(course.flc);
    //setFrequentChecked(course.frequent);
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="row"
      sx={
        {
          //border: 1,
          //borderRadius: 2,
          //bgcolor: "yellow",
          //width: { md: "590px" },
          //height: "20px",
          /* "& .MuiGrid-root": {
          p: {
            xs: "0px",
            //md: "2px"
          },
        }, */
        }
      }
    >
      <Grid item xs={12} sx={{ mr: -0.5, mb: -0.5 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
          sx={{
            color: "primary.main",
            //border: { xs: "1px solid grey", md: 0 },
            //borderRadius: { xs: 2, md: 0 },
            my: { xs: 0.7, md: 0 },
            //pr: { xs: 1, md: 0 },
          }}
        >
          <Grid
            item
            xs={8}
            md={8}
            onClick={handleCourseChange}
            sx={
              {
                //border: 1,
                //textOverflow: "ellipsis",
              }
            }
          >
            <Typography
              sx={{
                fontWeight: "bold",
                ml: { xs: 1, md: 1.5 },
                fontSize: "14px",
                overflow: { md: "hidden" },
                whiteSpace: { md: "nowrap" },
                textOverflow: { md: "ellipsis" },
              }}
            >
              {course.title}
            </Typography>
          </Grid>

          <Grid
            item
            xs={1.5}
            md={1.5}
            onClick={handleCourseChange}
            sx={{
              pl: { xs: 0, md: 1.5 },
              //border: 1
            }}
            textAlign="center"
          >
            <Checkbox
              //onChange={handleFlcChange}
              //checked={flcChecked}
              checked={course.flc}
              name="flc"
              disabled
            />
          </Grid>

          <Grid
            item
            xs={1.5}
            md={1.5}
            onClick={handleCourseChange}
            sx={
              {
                //pl: { xs: 0, md: 0 },
                //border: 1
              }
            }
            textAlign="center"
          >
            <Checkbox
              //onChange={handleFrequentChange}
              //checked={frequentChecked}
              checked={course.frequent}
              name="frequent"
              disabled
            />
          </Grid>

          <Grid
            item
            xs={1}
            md={1}
            sx={{
              pl: { xs: 0, md: 1 },
              //"& .MuiGrid-root": { pl: 0 },
              "& .MuiIconButton-root": {
                pl: { xs: "2px", md: "8px" },
                py: "8px",
              },
            }}
          >
            <IconButton
              onClick={onDeleteItem}
              //sx={{ visibility: course.title === "SIN CURSO" ? "hidden" : "" }}
              disabled={user.isDataModifier ? false : true}
              sx={{
                color: "#CF0000",
                visibility: user.isDataModifier ? "" : "hidden",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider sx={{ display: { md: "none" }, bgcolor: "lightgrey" }} />
      </Grid>
    </Grid>
  );
};
