import { dateCompare } from "../../helpers";

const today: Date = new Date();

const todayDay: number = today.getDate();
const nextDay: number = today.getDate() + 1;
const previousDay: number = today.getDate() - 1;

const todayMonth: number = today.getMonth();
const nextMonth: number = today.getMonth() + 1;
const previousMonth: number = today.getMonth() - 1;

const todayYear: number = today.getFullYear();
const nextYear: number = today.getFullYear() + 1;
const previousYear: number = today.getFullYear() - 1;

describe("Given a dateCompare function", () => {
  describe("When it's called with nextYear", () => {
    test("Then it returns 2", () => {
      expect(dateCompare(nextYear, todayMonth, todayDay)).toBe(2);
    });
  });
  describe("When it's called with previousYear", () => {
    test("Then it returns -2", () => {
      expect(dateCompare(previousYear, todayMonth, todayDay)).toBe(-2);
    });
  });

  describe("When it's called with todayYear and nextMonth", () => {
    test("Then it returns 2", () => {
      expect(dateCompare(todayYear, nextMonth, todayDay)).toBe(2);
    });
  });
  describe("When it's called with todayYear and previousMonth", () => {
    test("Then it returns -2", () => {
      expect(dateCompare(todayYear, previousMonth, todayDay)).toBe(-2);
    });
  });

  describe("When it's called with todayYear and todayMonth and nextDay", () => {
    test("Then it returns 1", () => {
      expect(dateCompare(todayYear, todayMonth, nextDay)).toBe(1);
    });
  });
  describe("When it's called with todayYear and todayMonth and previousDay", () => {
    test("Then it returns -1", () => {
      expect(dateCompare(todayYear, todayMonth, previousDay)).toBe(-1);
    });
  });

  describe("When it's called with todayYear and todayMonth and todayDay", () => {
    test("Then it returns 0", () => {
      expect(dateCompare(todayYear, todayMonth, todayDay)).toBe(0);
    });
  });
});
