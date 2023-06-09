import { Stack, Typography } from "@mui/material";

import { TechnicianName } from "./TechnicianName";
import { useAppUsersStore } from "../../../hooks/useAppUsersStore";
import { useState } from "react";

export const UserTechniciansBox = ({ formValues, onTechniciansOutChange }) => {
  const {
    techniciansShortNames,
    getTechniciansOutIdsByShortName,
    getTechniciansOutShortNames,
  } = useAppUsersStore();

  let techniciansOut = [...formValues.techniciansOut];
  const [techniciansOutShortNames, setTechniciansOutShortNames] = useState(
    getTechniciansOutShortNames(techniciansOut)
  );
  let newTechniciansOutShortNames = [...techniciansOutShortNames];

  const updateTechniciansList = (technicianShortName) => {
    if (
      techniciansOutShortNames.some(
        (technician) => technician === technicianShortName
      )
    ) {
      newTechniciansOutShortNames = [
        ...newTechniciansOutShortNames.filter(
          (technician) => technician !== technicianShortName
        ),
      ];
      setTechniciansOutShortNames((techniciansOutShortNames) =>
        techniciansOutShortNames.filter(
          (technician) => technician !== technicianShortName
        )
      );
    } else {
      newTechniciansOutShortNames = [
        ...newTechniciansOutShortNames,
        technicianShortName,
      ];
      setTechniciansOutShortNames((techniciansOutShortNames) => [
        ...techniciansOutShortNames,
        technicianShortName,
      ]);
    }

    onTechniciansOutChange(
      getTechniciansOutIdsByShortName(newTechniciansOutShortNames)
    );
  };

  const isInTechniciansOutShortNames = (technicianShortName) => {
    return techniciansOutShortNames.some(
      (shortName) => shortName === technicianShortName
    );
  };

  return (
    <>
      <Stack sx={{ borderRadius: "5px", border: "1px grey solid", p: "10px" }}>
        <Typography sx={{ mb: "3px", textAlign: "center", fontWeight: "bold" }}>
          Técnicos que están
        </Typography>
        {techniciansShortNames.map((technicianShortName) => (
          <TechnicianName
            key={technicianShortName}
            name={technicianShortName}
            isOut={isInTechniciansOutShortNames(technicianShortName)}
            updateTechniciansList={updateTechniciansList}
          />
        ))}
        {/*  <Typography>{JSON.stringify(techniciansOutShortNames)}</Typography> */}
      </Stack>
    </>
  );
};
