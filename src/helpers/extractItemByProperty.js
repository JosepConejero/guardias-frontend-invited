export const extractItemByProperty = (completeArray, oneProperty, value) => {
  //const defaultValue = {};
  for (let i = 0; i < completeArray.length; i++) {
    if (completeArray[i][`${oneProperty}`] === value)
      return { ...completeArray[i] };
  }
  return {};
};
