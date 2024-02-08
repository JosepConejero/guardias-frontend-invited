import { useDispatch, useSelector } from "react-redux";
import {
  onSelectGuardDay,
  onDeselectGuardDay,
  onUpdateOpenedGuardDay,
  onLoadTechniciansInGuardDay,
  onDeleteTechnicianOpenedGuardDay,
} from "../store/guardDay/guardDaySlice";

export const useGuardDayStore = () => {
  const dispatch = useDispatch();
  const {
    guardDayOpened,
    techniciansGuardDay,
    techniciansInGuardDay,
    techniciansOutGuardDay,
    coursesGuardDay,
  } = useSelector((state) => state.guardDay);

  const selectGuardDay = (payload) => {
    dispatch(onSelectGuardDay(payload));
  };

  const deselectGuardDay = () => {
    dispatch(onDeselectGuardDay());
  };

  const updateOpenedGuardDay = (payload) => {
    dispatch(onUpdateOpenedGuardDay(payload));
  };

  const loadTechniciansInGuardDay = (payload) => {
    dispatch(onLoadTechniciansInGuardDay(payload));
  };

  const deleteTechnicianOpenedGuardDay = (payload) => {
    dispatch(onDeleteTechnicianOpenedGuardDay(payload));
  };

  return {
    // properties
    guardDayOpened,
    techniciansGuardDay,
    techniciansInGuardDay,
    techniciansOutGuardDay,
    coursesGuardDay,
    // methods
    selectGuardDay,
    deselectGuardDay,
    updateOpenedGuardDay,
    loadTechniciansInGuardDay,
    deleteTechnicianOpenedGuardDay,
  };
};
