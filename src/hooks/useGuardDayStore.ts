import { useDispatch, useSelector } from "react-redux";
import {
  onSelectGuardDay,
  onDeselectGuardDay,
  onUpdateOpenedGuardDay,
  onLoadTechniciansInGuardDay,
  onDeleteTechnicianOpenedGuardDay,
} from "../store/guardDay/guardDaySlice";
import { RootState } from "../store";
import {
  EventGuardDay,
  UserShortName,
  UseGuardDayStoreReturnTypes,
} from "../interfaces";

export const useGuardDayStore = () => {
  const dispatch = useDispatch();
  const {
    guardDayOpened,
    //techniciansGuardDay,
    techniciansInGuardDay,
    //techniciansOutGuardDay,
    //coursesGuardDay,
  } = useSelector((state: RootState) => state.guardDay);

  const selectGuardDay = (payload: EventGuardDay): void => {
    dispatch(onSelectGuardDay(payload));
  };

  const deselectGuardDay = (): void => {
    dispatch(onDeselectGuardDay());
  };

  const updateOpenedGuardDay = (payload: EventGuardDay): void => {
    dispatch(onUpdateOpenedGuardDay(payload));
  };

  const loadTechniciansInGuardDay = (payload: UserShortName[]): void => {
    dispatch(onLoadTechniciansInGuardDay(payload));
  };

  const deleteTechnicianOpenedGuardDay = (payload: string): void => {
    dispatch(onDeleteTechnicianOpenedGuardDay(payload));
  };

  return {
    // properties
    guardDayOpened,
    //  techniciansGuardDay,
    techniciansInGuardDay,
    //  techniciansOutGuardDay,
    //coursesGuardDay,
    // methods
    selectGuardDay,
    deselectGuardDay,
    updateOpenedGuardDay,
    loadTechniciansInGuardDay,
    deleteTechnicianOpenedGuardDay,
  } as UseGuardDayStoreReturnTypes;
};
