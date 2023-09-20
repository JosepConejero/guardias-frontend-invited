import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const LabelButton = ({
  labelValue,
  textOn,
  textOff,
  onLabelChange,
  name,
}) => {
  const [activated, setActivated] = useState(labelValue);

  const handleClick = () => {
    onLabelChange(!activated, name);
  };

  useEffect(() => {
    setActivated(labelValue);
  }, [labelValue]);

  return (
    <>
      <Button
        color={labelValue ? "flcRelated" : "primary"}
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
        {labelValue ? textOn : textOff}
      </Button>
    </>
  );
};
