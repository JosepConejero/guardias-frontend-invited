export const extractItemByProperty = (
  completeArray: any[],
  oneProperty: string,
  value: any
): any => {
  for (let i = 0; i < completeArray.length; i++) {
    if (completeArray[i][`${oneProperty}`] === value)
      return { ...completeArray[i] };
  }
  return {};
};
