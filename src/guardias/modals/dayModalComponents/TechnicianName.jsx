import { Typography } from "@mui/material";

import "./TechnicianName.css";
import { useState } from "react";

export const TechnicianName = ({ name, modifyArray }) => {
  const [classSelected, setClassSelected] = useState(false);
  const handleClick = () => {
    setClassSelected((prevState) => !classSelected);
    //updateArray(name, classSelected);
    modifyArray(name);
  };

  return (
    <Typography
      px={1}
      mb={1 / 2}
      sx={{
        border: "1px grey solid",
        borderRadius: "4px",
        textAlign: "center",
      }}
      onClick={handleClick}
      className={classSelected ? "selected" : ""}
    >
      {name}
    </Typography>
  );
};
