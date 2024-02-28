/* eslint-disable array-callback-return */
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { Typography } from "@mui/material";
import {
  DayTechnician,
  EventGuardDay,
  UserShortName,
} from "../../../interfaces";

interface TeachersMenuProps {
  list: UserShortName[];
  initialValue: UserShortName;
  name?: string;
  index: number;
  disabled: boolean;
}

export default function TeachersMenu({
  list = [],
  initialValue,
  index,
  disabled,
}: TeachersMenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState(null);
  const open: boolean = Boolean(anchorEl);
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();

  const [technicianName, setTechnicianName] = useState<string>(
    initialValue === null || initialValue === undefined
      ? "TÉCNICO"
      : initialValue.shortName
  );

  const handleClick = (event: any) => {
    ///any
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (
    event: any,
    technician: UserShortName | "backdropClick" | "escapeKeyDown"
  ) => {
    ///any
    if (typeof technician !== "string")
      if (event.key !== "Escape") {
        if (event.target.innerText !== "") {
          setTechnicianName(technician.shortName);
          let newTechnicians: DayTechnician[] = [
            ...guardDayOpened!.technicians,
          ];
          newTechnicians[index] = {
            ...newTechnicians[index],
            technicianId: technician.id,
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
        {list.map((teacher: UserShortName) => {
          if (teacher)
            return (
              <MenuItem
                key={teacher.id}
                //technician={teacher.id}
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
