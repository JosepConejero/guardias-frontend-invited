//***********************************************************
//*  RETURNS -2 IF IT'S A DAY FROM A FORMER MONTH
//*  RETURNS -1 IF IT'S A FORMER DAY FROM THE SAME MONTH
//*  RETURNS  0 IF IT'S THE SAME DAY
//*  RETURNS  1 IF IT'S A LATER DAY FROM THE SAME MONTH
//*  RETURNS  2 IF IT'S A DAY FROM A LATER MONTH
//***********************************************************

export const dateCompare = (year, month, day) => {
  const today = new Date();

  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

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
