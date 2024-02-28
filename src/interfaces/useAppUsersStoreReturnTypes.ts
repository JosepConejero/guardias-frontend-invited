import {
  DayTechnician,
  TechnicianIdObject,
  TechnicianOut,
} from "./eventGuardDay";
import { User, UserShortName } from "./user";

export interface useAppUsersStoreReturnTypes {
  appUsers: User[];
  techniciansShortNames: string[];
  activeAppUser: User | null;
  teachers: UserShortName[];
  isSaving: boolean;
  isDeletingAppUser: boolean;
  setActiveAppUser: (appUser: User) => void;
  setInactiveAppUser: () => void;
  getTechniciansOutShortNames: (techniciansOut: TechnicianOut[]) => string[];
  technicianIdByShortName: (shortName: string) => string | undefined;
  getTechniciansOutIdsByShortName: (
    techniciansOutShortNames: string[]
  ) => TechnicianIdObject[];
  getTechniciansInIdsByShortName: (
    techniciansInShortNames: string[]
  ) => TechnicianIdObject[];
  startSavingAppUser: (appUser: User) => Promise<void>;
  startLoadingAppUsers: () => Promise<void>;
  startDeletingAppUser: (appUser: User) => Promise<void>;
  getTeachersIn: (techniciansOut: TechnicianIdObject[]) => UserShortName[];
  getTeacherById: (technicianId: string) => UserShortName | undefined;
  emptyTeachersName: (teachers: DayTechnician[]) => boolean;
  emptyAppUsers: () => void;
  getAppUserData: (id: string) => User | undefined;
  technicianShortNameById: (id: string) => string;
}
