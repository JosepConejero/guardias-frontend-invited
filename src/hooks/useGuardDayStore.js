import { useDispatch, useSelector } from "react-redux";
import {
  onSelectGuardDay,
  onDeselectGuardDay,
  onUpdateOpenedGuardDay,
  /*   onLoadTechniciansGuardDay,
  onEmptyTechniciansGuardDay,*/
  onLoadTechniciansInGuardDay,
  /*onEmptyTechniciansInGuardDay,
  onLoadTechniciansOutGuardDay,
  onEmptyTechniciansOutGuardDay, */
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

  /* const loadTechniciansGuardDay = (payload) => {
    dispatch(onLoadTechniciansGuardDay(payload));
  };

  const emptyTechniciansGuardDay = (payload) => {
    dispatch(onEmptyTechniciansGuardDay());
  };*/

  const loadTechniciansInGuardDay = (payload) => {
    dispatch(onLoadTechniciansInGuardDay(payload));
  };

  /*const emptyTechniciansInGuardDay = (payload) => {
    dispatch(onEmptyTechniciansInGuardDay());
  };

  const loadTechniciansOutGuardDay = (payload) => {
    dispatch(onLoadTechniciansOutGuardDay(payload));
  };

  const emptyTechniciansOutGuardDay = (payload) => {
    dispatch(onEmptyTechniciansOutGuardDay());
  }; */

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
    /*  loadTechniciansGuardDay,
    emptyTechniciansGuardDay,*/
    loadTechniciansInGuardDay,
    /*emptyTechniciansInGuardDay,
    loadTechniciansOutGuardDay,
    emptyTechniciansOutGuardDay, */
  };
};
