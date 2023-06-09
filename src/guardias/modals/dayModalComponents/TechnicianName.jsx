/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";

import "./TechnicianName.css";
import { useState } from "react";

export const TechnicianName = ({ name, isOut, updateTechniciansList }) => {
  const [classSelected, setClassSelected] = useState(isOut);
  const handleClick = () => {
    updateTechniciansList(name);
    setClassSelected((prevState) => !prevState);
  };

  /*   useEffect(() => {
    setClassSelected(isOut);
  }, []); */

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
