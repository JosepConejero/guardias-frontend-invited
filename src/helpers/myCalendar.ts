import { SimpleDate } from "../interfaces/event";

export const monthNames: string[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const daysByMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    ? true
    : false;
};

const daysOfMonth = (year: number, month: number): number => {
  if (month === 1) {
    if (isLeapYear(year)) return 29;
    else return 28;
  }
  return daysByMonth[month];
};

const firstDay = (year: number, month: number): number => {
  let newDate = new Date(year, month);
  return newDate.getDay();
};

export const isWeekend = (index: number): boolean =>
  (index + 1) % 7 === 0 || (index + 2) % 7 === 0;

export const isSunday = (index: number): boolean => (index + 1) % 7 === 0;

export const officeDate = (newYear: number, newMonth: number): SimpleDate[] => {
  let date: Date = new Date(newYear, newMonth);
  let year: number = date.getFullYear();
  let month: number = date.getMonth();

  let datePrevMonth: Date = new Date(year, month - 1);
  let prevMonth: number = datePrevMonth.getMonth();
  let yearPrevMonth: number = datePrevMonth.getFullYear();

  let dateNextMonth: Date = new Date(year, month + 1);
  let nextMonth: number = dateNextMonth.getMonth();
  let yearNextMonth: number = dateNextMonth.getFullYear();

  let daysOfThisMonth: number = daysOfMonth(year, month);
  let daysOfPrevMonth: number = daysOfMonth(year, prevMonth);
  let thisFirstDay: number = firstDay(year, month);

  let daysBefore: number = thisFirstDay === 0 ? 7 : thisFirstDay;
  let initialDayPrevMonth: number = daysOfPrevMonth - daysBefore + 2;

  const valorFinal: SimpleDate[] = [];

  for (let i = initialDayPrevMonth; i <= daysOfPrevMonth; i++) {
    valorFinal.push({ year: yearPrevMonth, month: prevMonth, day: i });
  }

  for (let i = 1; i <= daysOfThisMonth; i++) {
    valorFinal.push({ year: year, month: month, day: i });
  }

  const multiple7 = (number: number): boolean => number % 7 === 0;

  if (!multiple7(valorFinal.length)) {
    for (let i = 1; !multiple7(valorFinal.length); i++) {
      valorFinal.push({ year: yearNextMonth, month: nextMonth, day: i });
    }
  }

  return valorFinal;
};
