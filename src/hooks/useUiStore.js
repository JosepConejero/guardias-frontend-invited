import { useDispatch, useSelector } from "react-redux";
import {
  onOpenDayModal,
  onCloseDayModal,
  onOpenCourseModal,
  onCloseCourseModal,
  onOpenUsersModal,
  onCloseUsersModal,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDayModalOpen, isCourseModalOpen, isUsersModalOpen } = useSelector(
    (state) => state.ui
  );

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
  const openUserModal = () => {
    dispatch(onOpenUsersModal());
  };

  const closeUserModal = () => {
    dispatch(onCloseUsersModal());
  };

  return {
    //properties
    isDayModalOpen,
    isCourseModalOpen,
    isUsersModalOpen,

    //methods
    openDayModal,
    closeDayModal,
    openCourseModal,
    closeCourseModal,
    openUserModal,
    closeUserModal,
  };
};
