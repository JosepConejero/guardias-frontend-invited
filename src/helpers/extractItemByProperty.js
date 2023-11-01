export const extractItemByProperty = (completeArray, oneProperty, value) => {
  for (let i = 0; i < completeArray.length; i++) {
    if (completeArray[i][`${oneProperty}`] === value)
      return { ...completeArray[i] };
  }
  return {};
};
