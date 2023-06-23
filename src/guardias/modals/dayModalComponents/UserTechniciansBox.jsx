import { Stack, Typography } from "@mui/material";

import { TechnicianName } from "./TechnicianName";
import { useAppUsersStore } from "../../../hooks/useAppUsersStore";
import { useState } from "react";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";

export const UserTechniciansBox = () => {
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();
  //console.log("guardayopened vale ", guardDayOpened);
  const {
    techniciansShortNames,
    getTechniciansOutIdsByShortName,
    getTechniciansOutShortNames,
  } = useAppUsersStore();

  let techniciansOut = [...guardDayOpened.techniciansOut];
  const [techniciansOutShortNames, setTechniciansOutShortNames] = useState(
    getTechniciansOutShortNames(techniciansOut)
  );
  let newTechniciansOutShortNames = [...techniciansOutShortNames];
  //techniciansOutShortNames: el listado de los técnicos que no estarán

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
      //  updateOpenedGuardDay({
      //   ...guardDayOpened,
      //   techniciansOut: [
      //     ...guardDayOpened.techniciansOut.filter(
      //       (technician) => technician !== technicianShortName
      //     ),
      //   ],
      // });
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

    updateOpenedGuardDay({
      ...guardDayOpened,
      techniciansOut: [
        ...getTechniciansOutIdsByShortName(newTechniciansOutShortNames),
      ],
    });
  };
  /*  let techniciansOut = [...formValues.techniciansOut];
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
  }; */

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
      </Stack>
    </>
  );
};
