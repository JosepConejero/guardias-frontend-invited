import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";

export default function CoursesMenu({
  list = [],
  initialValue,
  index,
  disabled,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();

  const [courseName, setCourseName] = useState(
    initialValue === null ||
      initialValue === undefined ||
      JSON.stringify(initialValue) === "{}"
      ? "SIN CURSO"
      : initialValue.title
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, course) => {
    if (event.key !== "Escape") {
      if (event.target.innerText !== "") {
        setCourseName(course.title);
        let newTechnicians = [...guardDayOpened.technicians];
        newTechnicians[index] = {
          ...newTechnicians[index],
          courseId: course.id,
          isInClientWorkplace: false,
        };
        updateOpenedGuardDay({
          ...guardDayOpened,
          technicians: [...newTechnicians],
        });
      }
    }

    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        onClick={handleClick}
        sx={{ width: "350px" }}
        disabled={disabled}
      >
        <Typography
          fontSize="14px"
          fontWeight="bold"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {courseName}
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {list.map((course) => (
          <MenuItem
            key={course.id}
            technician={course.id}
            onClick={(event) => handleClose(event, course)}
          >
            {course.title.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
