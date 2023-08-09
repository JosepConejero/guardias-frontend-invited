export const sortArrayOfObjectsByProperty = (arrayOfObjects, property) => {
  const newArrayOfObjects = [...arrayOfObjects];

  const compareItems = (elementOfArray1, elementOfArray2) => {
    if (elementOfArray1[`${property}`] < elementOfArray2[`${property}`])
      return -1;
    if (elementOfArray1[`${property}`] > elementOfArray2[`${property}`])
      return 1;
    return 0;
  };

  newArrayOfObjects.sort(compareItems);

  return newArrayOfObjects;
};
