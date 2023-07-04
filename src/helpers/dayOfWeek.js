const dayNames = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const getDayOfWeekText = (index) => {
  if (index < 7) return dayNames[index];
  if (index < 7 * 2) return dayNames[index - 7];
  if (index < 7 * 3) return dayNames[index - 7 * 2];
  if (index < 7 * 4) return dayNames[index - 7 * 3];
  if (index < 7 * 5) return dayNames[index - 7 * 4];
  if (index < 7 * 6) return dayNames[index - 7 * 5];
};

export const dayOfWeekByYearMonthDay = (year, month, day) => {
  let dateData = new Date(year, month, day);
  return getDayOfWeekText(dateData.getDay() - 1);
};
