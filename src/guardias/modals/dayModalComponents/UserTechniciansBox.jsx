import { Stack, Typography } from "@mui/material";

import { TechnicianName } from "./TechnicianName";

let technicians = [
  "TONI",
  "JOSEP",
  "MIGUEL",
  "PILI",
  "ROSER",
  "CRISTINA",
  "ALBA",
  "M. ÁNGEL",
  "LLUISA",
];

export const UserTechniciansBox = ({ formValues }) => {
  console.log(formValues.techniciansOut);
  //TODO CREAR UN USESTATE PARA AÑADIR AL ARRAY DE LOS COJONES
  const newArray = formValues.techniciansOut;

  const modifyArray = (name) => {
    const found = newA.some((value) => value === name);
    if (found) {
      console.log("lo encontró");
    } else {
      console.log("no lo encontró");
      formValues.techniciansOut.push(name);
    }
  };

  return (
    <>
      <Stack sx={{ borderRadius: "5px", border: "1px grey solid", p: "10px" }}>
        <Typography sx={{ mb: "3px", textAlign: "center", fontWeight: "bold" }}>
          Técnicos que están
        </Typography>
        {technicians.map((technician) => (
          <TechnicianName
            key={technician}
            name={technician}
            modifyArray={modifyArray}
          />
        ))}
      </Stack>
    </>
  );
};
