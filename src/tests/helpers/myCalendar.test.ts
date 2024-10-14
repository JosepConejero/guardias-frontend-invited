import { isWeekend, isSunday, officeDate } from "../../helpers/myCalendar";

describe("Tests on myCalendar.ts", () => {
  test("isWeekend must return false if it receives '0'", () => {
    expect(isWeekend(0)).toBeFalsy();
  });
  test("isWeekend must return false if it receives '4'", () => {
    expect(isWeekend(4)).toBeFalsy();
  });
  test("isWeekend must return true if it receives '5'", () => {
    expect(isWeekend(5)).toBeTruthy();
  });
  test("isWeekend must return true if it receives '6'", () => {
    expect(isWeekend(6)).toBeTruthy();
  });
  test("isWeekend must return false if it receives '7'", () => {
    expect(isWeekend(7)).toBeFalsy();
  });

  test("isSunday must return true if it receives '6'", () => {
    expect(isSunday(6)).toBeTruthy();
  });
  test("isSunday must return false if it receives '5'", () => {
    expect(isSunday(5)).toBeFalsy();
  });

  test("officeDate must return a non-empty array of objects with 3 properties(day, month, year) if year is 2024 and month is 5", () => {
    const year = 2024;
    const month = 5;
    const daysOfMonth = officeDate(year, month);
    expect(daysOfMonth.length).toBeGreaterThan(0);
    /*    expect(typeof daysOfMonth[0].day).toBe("number");
    expect(typeof daysOfMonth[0].month).toBe("number");
    expect(typeof daysOfMonth[0].year).toBe("number"); */
    expect(daysOfMonth[0]).toEqual({
      day: expect.any(Number),
      month: expect.any(Number),
      year: expect.any(Number),
    });
    //probar que la estructura es un objeto con tres propiedades
  });
  test("officeDate must return a non-empty array of objects with 3 properties(day, month, year) if year is 2024 and month is 1", () => {
    const year = 2024;
    const month = 1;
    const daysOfMonth = officeDate(year, month);
    expect(daysOfMonth.length).toBeGreaterThan(0);
    /*    expect(typeof daysOfMonth[0].day).toBe("number");
    expect(typeof daysOfMonth[0].month).toBe("number");
    expect(typeof daysOfMonth[0].year).toBe("number"); */
    expect(daysOfMonth[0]).toEqual({
      day: expect.any(Number),
      month: expect.any(Number),
      year: expect.any(Number),
    });
    //probar que la estructura es un objeto con tres propiedades
  });
  test("officeDate must return a non-empty array of objects with 3 properties(day, month, year) if year is 2025 and month is 1", () => {
    const year = 2025;
    const month = 1;
    const daysOfMonth = officeDate(year, month);
    expect(daysOfMonth.length).toBeGreaterThan(0);
    /*    expect(typeof daysOfMonth[0].day).toBe("number");
    expect(typeof daysOfMonth[0].month).toBe("number");
    expect(typeof daysOfMonth[0].year).toBe("number"); */
    expect(daysOfMonth[0]).toEqual({
      day: expect.any(Number),
      month: expect.any(Number),
      year: expect.any(Number),
    });
    //probar que la estructura es un objeto con tres propiedades
  });
});
