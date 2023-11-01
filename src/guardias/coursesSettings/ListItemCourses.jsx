/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Divider, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCoursesStore } from "../../hooks/useCoursesStore";
import { useUiStore } from "../../hooks/useUiStore";
import { useAuthStore, useCalendarStore } from "../../hooks";
import { Confirmation } from "../../ui/pages/Confirmation";
import { useState } from "react";
import Swal from "sweetalert2";

export const ListItemCourses = ({ course }) => {
  const [open, setOpen] = useState(false);
  const { openCourseModal } = useUiStore();
  const { startDeletingCourse, setActiveCourse } = useCoursesStore();
  const { user } = useAuthStore();
  const { guardDays } = useCalendarStore();

  const handleCourseChange = () => {
    if (user.isDataModifier) {
      setActiveCourse(course);
      openCourseModal();
    }
  };

  const isThisCourseBeingUsed = (id) => {
    let found = false;
    for (let i = 0; i < guardDays.length; i++) {
      if (guardDays[i].technicians.length > 0) {
        for (let j = 0; j < guardDays[i].technicians.length; j++) {
          if (guardDays[i].technicians[j].courseId === id) {
            found = true;
            break;
          }
        }
      }
    }
    return found;
  };

  const onDeleteItem = () => {
    if (!isThisCourseBeingUsed(course.id)) {
      startDeletingCourse(course);
    } else {
      Swal.fire({
        title: "No se puede borrar el curso.",
        text: "El curso ya se ha impartido alguna vez.",
        icon: "error",
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (answer) => {
    if (answer) onDeleteItem();
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <Grid item xs={12} sx={{ mr: -0.5, mb: -0.5 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            sx={{
              color: "primary.main",
              my: { xs: 0.7, md: 0 },
            }}
          >
            <Grid item xs={8} md={8} onClick={handleCourseChange}>
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
              }}
              textAlign="center"
            >
              <Checkbox checked={course.flc} name="flc" disabled />
            </Grid>

            <Grid
              item
              xs={1.5}
              md={1.5}
              onClick={handleCourseChange}
              sx={{
                pl: user.isDataModifier ? {} : { xs: 1.5, md: 0 },
              }}
              textAlign="center"
            >
              <Checkbox checked={course.frequent} name="frequent" disabled />
            </Grid>

            <Grid
              item
              xs={1}
              md={1}
              sx={{
                pl: { xs: 0, md: 1.3 },
                "& .MuiIconButton-root": {
                  pl: { xs: "2px", md: "8px" },
                  py: "8px",
                },
              }}
            >
              <IconButton
                onClick={handleOpen}
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
      <Confirmation
        question="¿Seguro que quiere borrar este curso?"
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
