import { UserShortName } from "../interfaces/user";

export const sortedTechnicians = (
  technicians: UserShortName[]
): UserShortName[] => {
  if (technicians.length === 0) return [];
  let newTechnicians: UserShortName[] = [...technicians];

  let externoIndex: number | -1 = newTechnicians.findIndex(
    (technician) => technician.shortName === "EXTERNO"
  );

  let externoTechnician: UserShortName[] = [];
  if (externoIndex !== undefined && externoIndex !== null)
    externoTechnician = newTechnicians.splice(externoIndex, 1);

  const compareItems = (
    technician1: UserShortName,
    technician2: UserShortName
  ): -1 | 1 | 0 => {
    if (technician1.shortName < technician2.shortName) return -1;
    if (technician1.shortName > technician2.shortName) return 1;
    return 0;
  };

  newTechnicians.sort(compareItems);
  if (externoIndex !== undefined && externoIndex !== null)
    newTechnicians.push(externoTechnician[0]);

  return newTechnicians;
};
