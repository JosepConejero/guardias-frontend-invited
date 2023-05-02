//import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles.css";

//import { addHours } from "date-fns";

import { Month, Navbar } from "../components";
//import { localizer, getMessagesES } from "../../helpers";

/* const events = [
  {
    title: "título",
    notas: "notas",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "@fafafa",
    user: {
      _id: "123",
      name: "Fernando",
    },
  },
]; */

export const GuardiasPage = () => {
  return (
    <>
      <Navbar />
      <Month />

      {/*  <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )", marginTop: "80px" }}
        messages={getMessagesES()}
      /> */}
    </>
  );
};
