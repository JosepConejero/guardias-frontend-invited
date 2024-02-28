export const extractItemByProperty = <Type, Key extends keyof Type, Value>(
  completeArray: Type[],
  propertyKey: Key,
  propertyValue: Value
): Type => {
  for (let i = 0; i < completeArray.length; i++) {
    if (completeArray[i][propertyKey] === propertyValue)
      return { ...completeArray[i] };
  }
  return {} as Type;
};
