//***********************************************************
//*  RETURNS -2 IF IT'S A DAY FROM A FORMER MONTH
//*  RETURNS -1 IF IT'S A FORMER DAY FROM THE SAME MONTH
//*  RETURNS  0 IF IT'S THE SAME DAY
//*  RETURNS  1 IF IT'S A LATER DAY FROM THE SAME MONTH
//*  RETURNS  2 IF IT'S A DAY FROM A LATER MONTH
//***********************************************************

export const dateCompare = (
  year: number,
  month: number,
  day: number
): -2 | -1 | 0 | 1 | 2 | undefined => {
  const today: Date = new Date();

  const todayDay: number = today.getDate();
  const todayMonth: number = today.getMonth();
  const todayYear: number = today.getFullYear();

  if (year > todayYear) return 2;
  if (year < todayYear) return -2;
  if (year === todayYear) {
    if (month > todayMonth) return 2;
    if (month < todayMonth) return -2;
    if (month === todayMonth) {
      if (day > todayDay) return 1;
      if (day < todayDay) return -1;
      if (day === todayDay) return 0;
    }
  }
};
