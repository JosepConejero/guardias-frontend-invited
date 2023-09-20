import { Typography } from "@mui/material";

import "./TechnicianName.css";
import { useState } from "react";

export const TechnicianName = ({
  name,
  isOut,
  updateTechniciansList,
  disabled,
}) => {
  const [classSelected, setClassSelected] = useState(isOut);

  const handleClick = () => {
    if (!disabled) {
      updateTechniciansList(name);
      setClassSelected((prevState) => !prevState);
    }
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
