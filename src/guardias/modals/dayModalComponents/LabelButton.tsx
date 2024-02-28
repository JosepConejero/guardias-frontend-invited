import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface LabelButtonProps {
  labelValue: boolean;
  textOn: string;
  textOff: string;
  onLabelChange: (value: any, name: string) => void; ///any
  name: string;
  // technician: Technician;
}

/* (property) PaletteOptions.flcRelated?: {
  main?: string | undefined;
} | undefined
 */
declare module "@mui/material/styles" {
  /*   interface Palette {
    flcRelated?: {
      main: string;
    };
  }
  interface PaletteOptions {
    flcRelated?: {
      main: string;
    };
  } */
  /*   interface Palette {
    flcRelated: Palette["flcRelated"];
  }

  interface PaletteOptions {
    flcRelated?: PaletteOptions["flcRelated"];
  } */
}

// Update the Button's color options to include a violet option
declare module "@mui/material/Button" {
  /*  interface ButtonPropsColorOverrides {
    color: true;
  }

  interface OverridableStringUnion {
    color?: "flcRelated" | "primary";
  } */
}

export const LabelButton = ({
  labelValue,
  textOn,
  textOff,
  onLabelChange,
  name,
}: LabelButtonProps): JSX.Element => {
  const [activated, setActivated] = useState<boolean>(labelValue);

  const handleClick = (): void => {
    onLabelChange(!activated, name);
  };

  useEffect(() => {
    setActivated(labelValue);
  }, [labelValue]);

  return (
    <>
      <Button
        //color={labelValue ? "flcRelated" : "primary"}
        color={labelValue ? "info" : "primary"}
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
