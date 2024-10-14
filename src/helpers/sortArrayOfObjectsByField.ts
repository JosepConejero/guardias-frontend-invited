export const sortArrayOfObjectsByProperty = <Type, Key extends keyof Type>(
  arrayOfObjects: Type[],
  property: Key
) => {
  if (arrayOfObjects.length === 0) return [];
  if (
    typeof arrayOfObjects[0] === "object" &&
    arrayOfObjects[0] !== null &&
    arrayOfObjects[0] !== undefined
  ) {
    if (!(property in arrayOfObjects[0])) return [...arrayOfObjects];
  }
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
