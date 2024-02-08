const dayNames: string[] = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const getDayOfWeekText = (index: number): string => {
  if (index < 7) return dayNames[index];
  if (index < 7 * 2) return dayNames[index - 7];
  if (index < 7 * 3) return dayNames[index - 7 * 2];
  if (index < 7 * 4) return dayNames[index - 7 * 3];
  if (index < 7 * 5) return dayNames[index - 7 * 4];
  if (index < 7 * 6) return dayNames[index - 7 * 5];
  return "wrong day";
};

export const dayOfWeekByYearMonthDay = (
  year: number,
  month: number,
  day: number
) => {
  let dateData: Date = new Date(year, month, day);
  return getDayOfWeekText(dateData.getDay() - 1);
};
