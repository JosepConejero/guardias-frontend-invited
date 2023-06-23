import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";

export default function TeachersMenu({ list = [], initialValue, index }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //aquí abriré el estado y leeré la lista ???
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();

  const [technicianName, setTechnicianName] = useState(
    initialValue === null || initialValue === undefined
      ? "TÉCNICO"
      : initialValue.shortName
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = ({ target: { innerText } }, technician) => {
    //console.log(innerText);
    if (innerText !== "") {
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

    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {technicianName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {list.map((teacher) => (
          <MenuItem
            key={teacher.id}
            technician={teacher.id}
            onClick={(event) => handleClose(event, teacher)}
          >
            {teacher.shortName}
          </MenuItem>
        ))}
        {/*  <Divider />
        <MenuItem
          technician="EXTERNO"
          onClick={(event) => handleClose(event, "EXTERNO")}
        >
          EXTERNO
        </MenuItem> */}
      </Menu>
    </div>
  );
}
