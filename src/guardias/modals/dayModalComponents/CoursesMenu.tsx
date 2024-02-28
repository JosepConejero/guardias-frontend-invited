import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { Course, EventGuardDay } from "../../../interfaces";

interface CoursesMenuProps {
  list: Course[];
  initialValue: Course;
  name: string;
  index: number;
  disabled: boolean;
}

export default function CoursesMenu({
  list = [],
  initialValue,
  index,
  disabled,
}: CoursesMenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open: boolean = Boolean(anchorEl);
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();

  const [courseName, setCourseName] = useState(
    initialValue === null ||
      initialValue === undefined ||
      JSON.stringify(initialValue) === "{}"
      ? "SIN CURSO"
      : initialValue.title
  );

  const handleClick = (event: any) => {
    ///any
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (
    event: any, ///any
    /*     event: EventTarget & {
      key: string;
      target: EventTarget & { innerText: string };
    }, */
    course: Course | "backdropClick" | "escapeKeyDown"
  ) => {
    if (typeof course !== "string")
      if (event.key !== "Escape") {
        if (event.target.innerText !== "") {
          setCourseName(course.title);
          let newTechnicians = [...guardDayOpened!.technicians];
          newTechnicians[index] = {
            ...newTechnicians[index],
            courseId: course.id!,
            isInClientWorkplace: false,
          };
          updateOpenedGuardDay({
            ...guardDayOpened,
            technicians: [...newTechnicians],
          } as EventGuardDay);
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
        {list.map((course: Course) => (
          <MenuItem
            key={course.id}
            //technician={course.id}
            onClick={(event) => handleClose(event, course)}
          >
            {course.title.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
