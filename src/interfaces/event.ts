export interface Event {
  simpleDate: SimpleDate;
  technicians: Technician[];
  isHoliday: boolean;
  isThereOffice2h: boolean;
  isThereExtraMeeting: boolean;
  extraMeetingText: string;
  note: string;
  techniciansOut: TechnicianOut[];
  id: string; //he de comprobar si es opcional o no
}

interface SimpleDate {
  day: number;
  month: number;
  year: number;
}

interface TechnicianOut {
  technicianId: string;
  _id?: string;
}

interface Technician {
  technicianId: string;
  courseId: string | null;
  isInClientWorkplace: boolean;
  uniqueId: string;
  _id?: string;
}
