import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { Typography } from "@mui/material";

export default function TeachersMenu({ list = [], initialValue, index }) {
  //if (list !== undefined) console.log(list);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //aquí abriré el estado y leeré la lista ???
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();

  const [technicianName, setTechnicianName] = useState(
    initialValue === null ||
      initialValue === undefined /* || initialValue === "" */
      ? "TÉCNICO"
      : initialValue.shortName
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //const handleClose = ({ target: { innerText } }, technician) => {
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

  //if (JSON.stringify(list) === "[undefined]")
  return (
    <div>
      <Button
        id="basic-button"
        // aria-controls={open ? "basic-menu" : undefined}
        //aria-haspopup="true"
        //aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ width: "100px" }}
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
        //   onKeyDown={handleClose}
        // onKeyDown={() => console.log("se pulsa una tecla en el menú")}
        // MenuListProps={{
        //  "aria-labelledby": "basic-button",
        //}}
      >
        {list.map((teacher) => {
          //  console.log(teacher);
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
        {/*  {list.map((teacher) => (
          <MenuItem
            key={teacher.id}
            technician={teacher.id}
            onClick={(event) => handleClose(event, teacher)}
          >
             {teacher.shortName.toUpperCase()} 
          </MenuItem>
        ))} */}
      </Menu>
    </div>
  );
}

// {/*  <Divider />
// <MenuItem
//   technician="EXTERNO"
//   onClick={(event) => handleClose(event, "EXTERNO")}
// >
//   EXTERNO
// </MenuItem> */}
