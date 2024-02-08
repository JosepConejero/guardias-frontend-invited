export interface User {
  name: string;
  shortName: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  isActivated: boolean;
  isDataModifier: boolean;
  isTechnician: boolean;
  canFLC: boolean;
  canSeeStatistics: boolean;
  isStillWorking: boolean;
  isExternal: boolean;
  id: string;
}
