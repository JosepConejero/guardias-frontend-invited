import { Stack, Typography } from "@mui/material";

import { TechnicianName } from "./TechnicianName";
import { useAppUsersStore } from "../../../hooks/useAppUsersStore";
import { useState } from "react";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { useAuthStore } from "../../../hooks";
import { EventGuardDay, TechnicianOut } from "../../../interfaces";
import { UserWithUid } from "../../../interfaces/user";

export const UserTechniciansBox = (): JSX.Element => {
  const { guardDayOpened, updateOpenedGuardDay } = useGuardDayStore();
  const {
    techniciansShortNames,
    getTechniciansOutIdsByShortName,
    getTechniciansOutShortNames,
  } = useAppUsersStore();
  const { user }: { user: UserWithUid } = useAuthStore();

  let techniciansOut: TechnicianOut[] = guardDayOpened
    ? [...guardDayOpened.techniciansOut]
    : [];
  const [techniciansOutShortNames, setTechniciansOutShortNames] = useState<
    string[]
  >(getTechniciansOutShortNames(techniciansOut));
  let newTechniciansOutShortNames: string[] = [...techniciansOutShortNames];

  const updateTechniciansList = (technicianShortName: string): void => {
    if (
      techniciansOutShortNames.some(
        (technician: string) => technician === technicianShortName
      )
    ) {
      newTechniciansOutShortNames = [
        ...newTechniciansOutShortNames.filter(
          (technician: string) => technician !== technicianShortName
        ),
      ];
      setTechniciansOutShortNames((techniciansOutShortNames: string[]) =>
        techniciansOutShortNames.filter(
          (technician: string) => technician !== technicianShortName
        )
      );
    } else {
      newTechniciansOutShortNames = [
        ...newTechniciansOutShortNames,
        technicianShortName,
      ];
      setTechniciansOutShortNames((techniciansOutShortNames: string[]) => [
        ...techniciansOutShortNames,
        technicianShortName,
      ]);
    }

    updateOpenedGuardDay({
      ...guardDayOpened,
      techniciansOut: [
        ...getTechniciansOutIdsByShortName(newTechniciansOutShortNames),
      ],
    } as EventGuardDay);
  };

  const isInTechniciansOutShortNames = (
    technicianShortName: string
  ): boolean => {
    return techniciansOutShortNames.some(
      (shortName: string) => shortName === technicianShortName
    );
  };

  return (
    <>
      <Stack sx={{ borderRadius: "5px", border: "1px grey solid", p: "10px" }}>
        <Typography
          sx={{
            mb: "3px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Técnicos que están
        </Typography>
        {techniciansShortNames.map((technicianShortName: string) => (
          <TechnicianName
            key={technicianShortName}
            name={technicianShortName}
            isOut={isInTechniciansOutShortNames(technicianShortName)}
            updateTechniciansList={updateTechniciansList}
            disabled={!user.isDataModifier}
          />
        ))}
      </Stack>
    </>
  );
};
