interface AnyObject {
  [n: string]: any;
}

export const extractItemByProperty = (
  completeArray: AnyObject[],
  propertyKey: string,
  propertyValue: string
): AnyObject => {
  for (let i = 0; i < completeArray.length; i++) {
    if (completeArray[i][propertyKey] === propertyValue)
      return { ...completeArray[i] };
  }
  return {} as AnyObject;
};
