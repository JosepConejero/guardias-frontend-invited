import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";

export default function CoursesMenu({ list = [], initialValue, index }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //aquí abriré el estado y leeré la lista ???
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

  //const handleClose = ({ target: { innerText } }, course) => {
  const handleClose = (event, course) => {
    //console.log(innerText);
    if (event.key !== "Escape") {
      if (event.target.innerText !== "") {
        setCourseName(course.title);
        let newTechnicians = [...guardDayOpened.technicians];
        //console.log(newTechnicians[index]);
        console.log(newTechnicians[index].isInClientWorkplace);
        newTechnicians[index] = {
          ...newTechnicians[index],
          courseId: course.id,
          isInClientWorkplace: course.title === "SIN CURSO" ? false : true,
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
        /* aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined} */
        onClick={handleClick}
        sx={{ width: "350px" }}
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
        /*  MenuListProps={{
          "aria-labelledby": "basic-button",
        }} */
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
