import { extractItemByProperty } from "../../helpers";

describe("Tests on extractItemByProperty.ts", () => {
  const myArrayOfObjects = [
    { property1_1: "value1_1", property1_2: "value1_2" },
    { property2_1: "value2_1", property2_2: "value2_2" },
    { property3_1: "value3_1", property3_2: "value3_2" },
  ];
  test("Must return '{}' if property doesn't exist", () => {
    const myObject = extractItemByProperty(
      myArrayOfObjects,
      "property4_2",
      "value2_2"
    );
    expect(myObject).toStrictEqual({});
  });
  test("Must return '{property2_1: 'value2_1', property2_2: 'value2_2' }' if property='property2_2' and value='value2_2'", () => {
    const myObject = extractItemByProperty(
      myArrayOfObjects,
      "property2_2",
      "value2_2"
    );
    const expectedObject = { property2_1: "value2_1", property2_2: "value2_2" };
    expect(myObject).toStrictEqual(expectedObject);
  });
});
