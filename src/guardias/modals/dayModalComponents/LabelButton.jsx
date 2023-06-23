import { Button } from "@mui/material";
import { useState } from "react";

export const LabelButton = ({
  initialValue,
  textOn,
  textOff,
  onLabelChange,
  name,
}) => {
  const [activated, setActivated] = useState(initialValue);
  //console.log(name, activated);
  const handleClick = () => {
    onLabelChange(!activated, name);
    setActivated(!activated);
  };

  return (
    <Button
      color="primary"
      disabled={false}
      size="small"
      variant="outlined"
      sx={{ borderRadius: 5, height: "20px", width: "100px" }}
      onClick={handleClick}
      name={name}
    >
      {activated ? textOn : textOff}
    </Button>
  );
};
