import { dayOfWeekByYearMonthDay, getDayOfWeekText } from "../../helpers";

describe("Given a getDayOfWeekText function", () => {
  describe("When it's called with 6", () => {
    test("Then it returns 'Domingo'", () => {
      expect(getDayOfWeekText(6)).toBe("Domingo");
    });
  });
  describe("When it's called with 13", () => {
    test("Then it returns 'Domingo'", () => {
      expect(getDayOfWeekText(13)).toBe("Domingo");
    });
  });
  describe("When it's called with 20", () => {
    test("Then it returns 'Domingo'", () => {
      expect(getDayOfWeekText(20)).toBe("Domingo");
    });
  });
  describe("When it's called with 27", () => {
    test("Then it returns 'Domingo'", () => {
      expect(getDayOfWeekText(27)).toBe("Domingo");
    });
  });
  describe("When it's called with 34", () => {
    test("Then it returns 'Domingo'", () => {
      expect(getDayOfWeekText(34)).toBe("Domingo");
    });
  });
  describe("When it's called with 41", () => {
    test("Then it returns 'wrong day'", () => {
      expect(getDayOfWeekText(41)).toBe("Domingo");
    });
  });
  describe("When it's called with 42", () => {
    test("Then it returns 'wrong day'", () => {
      expect(getDayOfWeekText(42)).toBe("wrong day");
    });
  });
});

describe("Given a dayOfWeekByYearMonthDay function", () => {
  const year = 2024;
  const month = 2;
  const day = 6;
  const dayOfWeek = dayOfWeekByYearMonthDay(year, month, day);
  console.log(dayOfWeek);

  describe("When it's called with year: 2024, month: 2, day: 6", () => {
    test("Then it returns 'Miércoles'", () => {
      expect(dayOfWeek).toStrictEqual("Miércoles");
    });
  });
});
