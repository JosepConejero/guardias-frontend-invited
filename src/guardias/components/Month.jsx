//import "../../styles.css";
import {
  officeDate,
  monthNames,
  getDayOfWeekText,
} from "../../helpers/myCalendar";
import { Day } from "./Day";
import { useState } from "react";

export const Month = () => {
  const [showedDate, setShowDate] = useState(new Date());
  const [showedDays, setShowedDays] = useState(
    officeDate(showedDate.getFullYear(), showedDate.getMonth())
  );

  const onPreviousMonth = () => {
    setShowDate(
      () => new Date(showedDate.getFullYear(), showedDate.getMonth() - 1)
    );
    setShowedDays(() =>
      officeDate(showedDate.getFullYear(), showedDate.getMonth() - 1)
    );
  };

  const onNextMonth = () => {
    setShowDate(
      () => new Date(showedDate.getFullYear(), showedDate.getMonth() + 1)
    );
    setShowedDays(() =>
      officeDate(showedDate.getFullYear(), showedDate.getMonth() + 1)
    );
  };

  return (
    <>
      <div className="mes">
        <button onClick={onPreviousMonth}>prev</button>
        <span>
          {" "}
          {monthNames[showedDate.getMonth()]} {showedDate.getFullYear()}{" "}
        </span>
        <button onClick={onNextMonth}>next</button>
        <hr />
        {showedDays.map((date, index) => (
          <Day
            key={index}
            date={date}
            dayOfWeekText={getDayOfWeekText(index)}
          />
        ))}
      </div>
    </>
  );
};
