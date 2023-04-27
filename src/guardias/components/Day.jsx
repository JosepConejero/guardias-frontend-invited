import { monthNames } from "../../helpers";
import "../../styles.css";

export const Day = ({ date: { day, year, month }, dayOfWeekText }) => {
  return (
    <>
      <span className="day-format">{`DÍA: ${dayOfWeekText}, ${day}-${monthNames[month]}-${year}`}</span>
    </>
  );
};
