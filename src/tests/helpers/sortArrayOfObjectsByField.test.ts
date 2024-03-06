import { sortArrayOfObjectsByProperty } from "../../helpers";

interface ArrayOfObjects {
  [property: string]: string;
}

const arrayOfObjects: ArrayOfObjects[] = [
  {
    property1: "K",
    property2: "C",
    property3: "L",
  },
  {
    property1: "E",
    property2: "B",
    property3: "R",
  },
  {
    property1: "T",
    property2: "A",
    property3: "H",
  },
];

const orderedArrayOfObjects: ArrayOfObjects[] = [
  {
    property1: "T",
    property2: "A",
    property3: "H",
  },
  {
    property1: "E",
    property2: "B",
    property3: "R",
  },
  {
    property1: "K",
    property2: "C",
    property3: "L",
  },
];

describe("Given a sortArrayOfObjectsByField function", () => {
  describe("When it receives arrayOfObjects and property 'property2'", () => {
    test("Then it returns that array ordered by that property", () => {
      expect(
        sortArrayOfObjectsByProperty(arrayOfObjects, "property2")
      ).toStrictEqual(orderedArrayOfObjects);
    });
  });
  describe("When it receives an empty array", () => {
    test("Then it returns an empty array", () => {
      expect(sortArrayOfObjectsByProperty([], "property2")).toStrictEqual([]);
    });
  });
  describe("When it receives an array and a property that doesn't exist", () => {
    test("Then it returns the same array", () => {
      expect(
        sortArrayOfObjectsByProperty(arrayOfObjects, "property4")
      ).toStrictEqual(arrayOfObjects);
    });
  });
});
