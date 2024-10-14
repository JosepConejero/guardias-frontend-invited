import { StatusType } from "../types";
import { User } from "./user";

export interface AuthSliceInitialState {
  status: StatusType;
  user: User | {};
  errorMessage: string | undefined;
  isChangingPassword: boolean;
  isRestoringPassword: boolean;
}
