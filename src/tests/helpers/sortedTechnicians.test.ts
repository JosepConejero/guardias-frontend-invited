import { sortedTechnicians } from "../../helpers";

const fourTechnicians = [
  {
    shortName: "technician 3",
    id: "id 3",
  },
  {
    shortName: "technician 1",
    id: "id 1",
  },
  {
    shortName: "technician 2",
    id: "id 2",
  },
  {
    shortName: "technician 4",
    id: "id 4",
  },
];

const fourOrderedTechnicians = [
  {
    shortName: "technician 1",
    id: "id 1",
  },
  {
    shortName: "technician 2",
    id: "id 2",
  },
  {
    shortName: "technician 3",
    id: "id 3",
  },
  {
    shortName: "technician 4",
    id: "id 4",
  },
];

const oneTechnician = [
  {
    shortName: "technician 1",
    id: "id 1",
  },
];

describe("Given a sortedTechnicians function", () => {
  describe("When it's called with an array of technicians 'fourTechnicians'", () => {
    test("Then it doesn't return an unordered array of 'fourTechnicians'", () => {
      expect(sortedTechnicians(fourTechnicians)).not.toStrictEqual(
        fourTechnicians
      );
    });
    test("Then it returns an ordered array of 'fourTechnicians'", () => {
      expect(sortedTechnicians(fourTechnicians)).toStrictEqual(
        fourOrderedTechnicians
      );
    });
  });
  describe("When it's called with an empty array", () => {
    test("Then it returns an emtpy array", () => {
      expect(sortedTechnicians([])).toStrictEqual([]);
    });
  });
  describe("When it's called with one single technician", () => {
    test("Then it returns the same technician", () => {
      expect(sortedTechnicians(oneTechnician)).toStrictEqual(oneTechnician);
    });
  });
});
