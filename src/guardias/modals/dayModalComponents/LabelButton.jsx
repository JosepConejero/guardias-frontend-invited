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

  const colorActivated = activated ? "flcRelated" : "primary";

  return (
    <Button
      color={colorActivated}
      disabled={false}
      size="small"
      variant="outlined"
      sx={{
        borderRadius: 5,
        height: "20px",
        width: "120px",
      }}
      onClick={handleClick}
      name={name}
    >
      {activated ? textOn : textOff}
    </Button>
  );
};
