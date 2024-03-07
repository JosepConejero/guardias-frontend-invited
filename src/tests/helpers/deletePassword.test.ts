import { deletePassword } from "../../helpers";

const users = [
  {
    name: "nombre 1",
    shortName: "nombre corto 1",
    email: "email 1",
    password: "password 1",
    isAdmin: true,
    isActivated: true,
    isDataModifier: true,
    isTechnician: true,
    canFLC: true,
    canSeeStatistics: true,
    isStillWorking: true,
    isExternal: true,
    id: "id 1",
  },
  {
    name: "nombre 2",
    shortName: "nombre corto 2",
    email: "email 2",
    password: "password 2",
    isAdmin: true,
    isActivated: true,
    isDataModifier: true,
    isTechnician: true,
    canFLC: true,
    canSeeStatistics: true,
    isStillWorking: true,
    isExternal: true,
    id: "id 2",
  },
];

const usersWithoutPasswordProperty = [
  {
    name: "nombre 1",
    shortName: "nombre corto 1",
    email: "email 1",
    isAdmin: true,
    isActivated: true,
    isDataModifier: true,
    isTechnician: true,
    canFLC: true,
    canSeeStatistics: true,
    isStillWorking: true,
    isExternal: true,
    id: "id 1",
  },
  {
    name: "nombre 2",
    shortName: "nombre corto 2",
    email: "email 2",
    isAdmin: true,
    isActivated: true,
    isDataModifier: true,
    isTechnician: true,
    canFLC: true,
    canSeeStatistics: true,
    isStillWorking: true,
    isExternal: true,
    id: "id 2",
  },
];

describe("Given a deletePassword function", () => {
  describe("When it's called with an array of 2 users", () => {
    test("Then it returns the same array without password property", () => {
      expect(deletePassword(users)).toStrictEqual(usersWithoutPasswordProperty);
    });
  });
  describe("When it's called with an emtpy array of users", () => {
    test("Then it returns an empty array", () => {
      expect(deletePassword([])).toStrictEqual([]);
    });
  });
  describe("When it's called without array", () => {
    test("Then it returns an empty array", () => {
      expect(deletePassword()).toStrictEqual([]);
    });
  });
});
