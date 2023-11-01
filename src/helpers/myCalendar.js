export const monthNames = [
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
const daysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    ? true
    : false;
};

const daysOfMonth = (year, month) => {
  if (month === 1) {
    if (isLeapYear(year)) return 29;
    else return 28;
  }
  return daysByMonth[month];
};

const firstDay = (year, month) => {
  let newDate = new Date(year, month);
  return newDate.getDay();
};

export const isWeekend = (index) =>
  (index + 1) % 7 === 0 || (index + 2) % 7 === 0;

export const isSunday = (index) => (index + 1) % 7 === 0;

export const officeDate = (newYear, newMonth) => {
  let date = new Date(newYear, newMonth);
  let year = date.getFullYear();
  let month = date.getMonth();

  let datePrevMonth = new Date(year, month - 1);
  let prevMonth = datePrevMonth.getMonth();
  let yearPrevMonth = datePrevMonth.getFullYear();

  let dateNextMonth = new Date(year, month + 1);
  let nextMonth = dateNextMonth.getMonth();
  let yearNextMonth = dateNextMonth.getFullYear();

  let daysOfThisMonth = daysOfMonth(year, month);
  let daysOfPrevMonth = daysOfMonth(year, prevMonth);
  let thisFirstDay = firstDay(year, month);

  let daysBefore = thisFirstDay === 0 ? 7 : thisFirstDay;
  let initialDayPrevMonth = daysOfPrevMonth - daysBefore + 2;

  const valorFinal = [];

  for (let i = initialDayPrevMonth; i <= daysOfPrevMonth; i++) {
    valorFinal.push({ year: yearPrevMonth, month: prevMonth, day: i });
  }

  for (let i = 1; i <= daysOfThisMonth; i++) {
    valorFinal.push({ year: year, month: month, day: i });
  }

  const multiple7 = (number) => number % 7 === 0;

  if (!multiple7(valorFinal.length)) {
    for (let i = 1; !multiple7(valorFinal.length); i++) {
      valorFinal.push({ year: yearNextMonth, month: nextMonth, day: i });
    }
  }

  return valorFinal;
};
