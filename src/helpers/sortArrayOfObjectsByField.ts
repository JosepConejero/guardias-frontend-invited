export const sortArrayOfObjectsByProperty = <Type, Key extends keyof Type>(
  arrayOfObjects: Type[],
  property: Key
) => {
  const newArrayOfObjects: Type[] = [...arrayOfObjects];

  const compareItems = (
    elementOfArray1: Type,
    elementOfArray2: Type
  ): -1 | 1 | 0 => {
    //String(property) o bien: property o bien: `${property}`
    if (elementOfArray1[property] < elementOfArray2[property]) return -1;
    if (elementOfArray1[property] > elementOfArray2[property]) return 1;
    return 0;
  };

  newArrayOfObjects.sort(compareItems);

  return newArrayOfObjects;
};
