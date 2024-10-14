import { EventGuardDay } from "./eventGuardDay";
import { UserShortName } from "./user";

export interface UseGuardDayStoreReturnTypes {
  guardDayOpened: EventGuardDay | null;
  techniciansInGuardDay: UserShortName[];
  selectGuardDay: (payload: EventGuardDay) => void;
  deselectGuardDay: () => void;
  updateOpenedGuardDay: (payload: EventGuardDay) => void;
  loadTechniciansInGuardDay: (payload: UserShortName[]) => void;
  deleteTechnicianOpenedGuardDay: (payload: string) => void;
}
