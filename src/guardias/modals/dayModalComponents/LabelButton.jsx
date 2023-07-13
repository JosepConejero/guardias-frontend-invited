import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const LabelButton = ({
  labelValue,
  textOn,
  textOff,
  onLabelChange,
  name,
  //technician,
}) => {
  const [activated, setActivated] = useState(labelValue);
  //const [activated, setActivated] = useState(technician.isInClientWorkplace);
  //console.log(name, activated);
  const handleClick = () => {
    onLabelChange(!activated, name);
    //setActivated(!activated);
    ////setActivated((previousValue) => !previousValue);
  };

  //const colorActivated = activated ? "flcRelated" : "primary";

  useEffect(() => {
    //console.log("entra en el useEffect del label");
    setActivated(labelValue);
  }, [labelValue]);

  return (
    <>
      {/*   {labelValue.toString()}
      {activated.toString()} */}
      <Button
        /* color={colorActivated} */
        color={labelValue ? "flcRelated" : "primary"}
        /* color={activated ? "flcRelated" : "primary"} */
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
        {/*     {activated ? textOn : textOff} */}
      </Button>
    </>
  );
};
