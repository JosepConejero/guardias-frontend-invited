import { useDispatch, useSelector } from "react-redux";
import {
  onOpenDayModal,
  onCloseDayModal,
  onOpenCourseModal,
  onCloseCourseModal,
  onOpenAppUsersModal,
  onCloseAppUsersModal,
} from "../store/ui/uiSlice";
import { RootState } from "../store";

interface UseUiStoreReturnTypes {
  isDayModalOpen: boolean;
  isCourseModalOpen: boolean;
  isAppUsersModalOpen: boolean;
  openDayModal: () => void;
  closeDayModal: () => void;
  openCourseModal: () => void;
  closeCourseModal: () => void;
  openAppUserModal: () => void;
  closeAppUserModal: () => void;
}

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDayModalOpen, isCourseModalOpen, isAppUsersModalOpen } =
    useSelector((state: RootState) => state.ui);

  const openDayModal = (): void => {
    dispatch(onOpenDayModal());
  };

  const closeDayModal = (): void => {
    dispatch(onCloseDayModal());
  };
  const openCourseModal = (): void => {
    dispatch(onOpenCourseModal());
  };

  const closeCourseModal = (): void => {
    dispatch(onCloseCourseModal());
  };
  const openAppUserModal = (): void => {
    dispatch(onOpenAppUsersModal());
  };

  const closeAppUserModal = (): void => {
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
  } as UseUiStoreReturnTypes;
};
