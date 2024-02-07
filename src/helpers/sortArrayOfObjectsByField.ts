export const sortArrayOfObjectsByProperty = (
  arrayOfObjects: any[],
  property: string
) => {
  const newArrayOfObjects: any[] = [...arrayOfObjects];

  const compareItems = (
    elementOfArray1: any,
    elementOfArray2: any
  ): -1 | 1 | 0 => {
    if (elementOfArray1[`${property}`] < elementOfArray2[`${property}`])
      return -1;
    if (elementOfArray1[`${property}`] > elementOfArray2[`${property}`])
      return 1;
    return 0;
  };

  newArrayOfObjects.sort(compareItems);

  return newArrayOfObjects;
};
