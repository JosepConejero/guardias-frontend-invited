export interface EventGuardDay {
  simpleDate: SimpleDate;
  technicians: DayTechnician[];
  isHoliday: boolean;
  isThereOffice2h: boolean;
  isThereExtraMeeting: boolean;
  extraMeetingText: string;
  note: string;
  techniciansOut: TechnicianOut[];
  id?: string; //he de comprobar si es opcional o no
}

/* export interface EventGuardDayWithUid {
  simpleDate: SimpleDate;
  technicians: DayTechnician[];
  isHoliday: boolean;
  isThereOffice2h: boolean;
  isThereExtraMeeting: boolean;
  extraMeetingText: string;
  note: string;
  techniciansOut: TechnicianOut[];
  uid?: string; //para cuando recibe datos de la api
} */

export interface SimpleDate {
  day: number;
  month: number;
  year: number;
}

export interface TechnicianOut {
  technicianId: string;
  _id?: string;
}

export interface TechnicianIn {
  technicianId: string;
  _id?: string;
}

export interface DayTechnician {
  technicianId: string;
  courseId: string | null;
  isInClientWorkplace: boolean;
  uniqueId: string;
  _id?: string;
}

export interface Technician {
  technicianId: null | string;
  courseId: null | string;
  isInClientWorkplace: boolean;
  uniqueId: string;
}

export interface TechnicianIdObject {
  technicianId: string;
}

export interface TechnicianStatistics {
  technicianId: string;
  shortName: string;
  totalGuards: number;
  totalFlcs: number;
}
