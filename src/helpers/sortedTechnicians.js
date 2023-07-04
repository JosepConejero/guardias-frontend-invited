export const sortedTechnicians = (technicians) => {
  let newTechnicians = [...technicians];

  let externoIndex = newTechnicians.findIndex(
    (technician) => technician.shortName === "EXTERNO"
  );

  let externoTechnician;
  if (externoIndex !== undefined && externoIndex !== null)
    externoTechnician = newTechnicians.splice(externoIndex, 1);

  const compareItems = (technician1, technician2) => {
    if (technician1.shortName < technician2.shortName) return -1;
    if (technician1.shortName > technician2.shortName) return 1;
    return 0;
  };

  newTechnicians.sort(compareItems);
  if (externoIndex !== undefined && externoIndex !== null)
    newTechnicians.push(externoTechnician[0]);

  return newTechnicians;
};
