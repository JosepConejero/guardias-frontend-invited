import { useDispatch, useSelector } from "react-redux";
import {
  onOpenDayModal,
  onCloseDayModal,
  onOpenCourseModal,
  onCloseCourseModal,
  onOpenAppUsersModal,
  onCloseAppUsersModal,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDayModalOpen, isCourseModalOpen, isAppUsersModalOpen } =
    useSelector((state) => state.ui);

  const openDayModal = () => {
    dispatch(onOpenDayModal());
  };

  const closeDayModal = () => {
    dispatch(onCloseDayModal());
  };
  const openCourseModal = () => {
    dispatch(onOpenCourseModal());
  };

  const closeCourseModal = () => {
    dispatch(onCloseCourseModal());
  };
  const openAppUserModal = () => {
    dispatch(onOpenAppUsersModal());
  };

  const closeAppUserModal = () => {
    dispatch(onCloseAppUsersModal());
  };

  return {
    //properties
    isDayModalOpen,
    isCourseModalOpen,
    isAppUsersModalOpen,

    //methods
    openDayModal,
    closeDayModal,
    openCourseModal,
    closeCourseModal,
    openAppUserModal,
    closeAppUserModal,
  };
};
