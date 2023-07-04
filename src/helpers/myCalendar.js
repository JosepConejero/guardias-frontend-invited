//const fecha = new Date(2023, 3, 1);
//const fecha = new Date(2023, 1);

//console.log("año: ",fecha.getFullYear());
//console.log("mes: ",fecha.getMonth());
//console.log("día: ",fecha.getDate());
//console.log("día de la semana: ",fecha.getDay());

/*const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let fecha = new Date(year, month-24)
year = fecha.getFullYear();
month = fecha.getMonth();
days = fecha.getDate();

console.log(year, month);
console.log(fecha, days);

const diasdeestemes = 31;
const diaquecaeelprimerdia = 3;*/
//const firstDay = fe

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
/* const dayNames = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
]; */
//const leapYear = 2024;
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

/* export const getDayOfWeekText = (index) => {
  if (index < 7) return dayNames[index];
  if (index < 7 * 2) return dayNames[index - 7];
  if (index < 7 * 3) return dayNames[index - 7 * 2];
  if (index < 7 * 4) return dayNames[index - 7 * 3];
  if (index < 7 * 5) return dayNames[index - 7 * 4];
  if (index < 7 * 6) return dayNames[index - 7 * 5];
}; */

export const isWeekend = (index) =>
  (index + 1) % 7 === 0 || (index + 2) % 7 === 0;

export const isSunday = (index) => (index + 1) % 7 === 0;

export const officeDate = (newYear, newMonth) => {
  let date = new Date(newYear, newMonth);
  let year = date.getFullYear();
  let month = date.getMonth();
  //console.log({ date, year, month });

  let datePrevMonth = new Date(year, month - 1);
  let prevMonth = datePrevMonth.getMonth();
  let yearPrevMonth = datePrevMonth.getFullYear();
  //console.log({ datePrevMonth, yearPrevMonth, prevMonth });

  let dateNextMonth = new Date(year, month + 1);
  let nextMonth = dateNextMonth.getMonth();
  let yearNextMonth = dateNextMonth.getFullYear();
  //let nextMonthFirstDay = firstDay(yearNextMonth, nextMonth);
  //console.log({ dateNextMonth, yearNextMonth, nextMonth });

  let daysOfThisMonth = daysOfMonth(year, month);
  let daysOfPrevMonth = daysOfMonth(year, prevMonth);
  let thisFirstDay = firstDay(year, month);
  //console.log({ daysOfThisMonth, daysOfPrevMonth, thisFirstDay });

  let daysBefore = thisFirstDay === 0 ? 7 : thisFirstDay;
  let initialDayPrevMonth = daysOfPrevMonth - daysBefore + 2;
  // console.log({ daysBefore, initialDayPrevMonth });

  const valorFinal = [];

  for (let i = initialDayPrevMonth; i <= daysOfPrevMonth; i++) {
    valorFinal.push({ year: yearPrevMonth, month: prevMonth, day: i });
  }
  // console.log(valorFinal);
  // console.log(valorFinal.length);

  for (let i = 1; i <= daysOfThisMonth; i++) {
    valorFinal.push({ year: year, month: month, day: i });
  }
  // console.log(valorFinal);
  // console.log(valorFinal.length);

  const multiple7 = (number) => number % 7 === 0;

  // console.log("longitud del array: ", valorFinal.length);
  // console.log(multiple7(valorFinal.length));

  if (!multiple7(valorFinal.length)) {
    for (let i = 1; !multiple7(valorFinal.length); i++) {
      // console.log({ year: yearNextMonth, month: nextMonth, day: i });
      valorFinal.push({ year: yearNextMonth, month: nextMonth, day: i });
      //console.log("contador: ", i);
    }
  }

  return valorFinal;
};

//console.log(officeDate(2022, 11));

/* const fecha = {}

const daysBefore = ({month, year}) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const date2 = new Date()

  return;
};
export const monthDays = (month) => {
  let numberOfDays;
  if (month === 1) {
    isLeapYear(month) ? 29 : 28;
    return;
  }
  const numberOfDays = daysByMonth[month];

  return [];
};

//const officeDate = new Date();
const day = officeDate.getDate();
const month = officeDate.getMonth();
const monthText = monthsText[month];
const year = officeDate.getFullYear();
const dayOfWeek = officeDate.getDay();
const anyosFebero29 = 2024;

const officeDate = {
  today: new Date(),
  days: [],
};

const semana = [27, 28, 29, 30, 1, 2, 3]; */
