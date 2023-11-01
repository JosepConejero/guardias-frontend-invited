/* eslint-disable array-callback-return */
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { Typography } from "@mui/material";

export default function TeachersMenu({
  list = [],
  initialValue,
  index,
  disabled,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();

  const [technicianName, setTechnicianName] = useState(
    initialValue === null || initialValue === undefined
      ? "TÉCNICO"
      : initialValue.shortName
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, technician) => {
    if (event.key !== "Escape") {
      if (event.target.innerText !== "") {
        setTechnicianName(technician.shortName);
        let newTechnicians = [...guardDayOpened.technicians];
        newTechnicians[index] = {
          ...newTechnicians[index],
          technicianId: technician.id,
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
        sx={{ width: "100px" }}
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
          {technicianName}
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {list.map((teacher) => {
          if (teacher)
            return (
              <MenuItem
                key={teacher.id}
                technician={teacher.id}
                onClick={(event) => handleClose(event, teacher)}
              >
                {teacher.shortName.toUpperCase()}
              </MenuItem>
            );
        })}
      </Menu>
    </div>
  );
}
