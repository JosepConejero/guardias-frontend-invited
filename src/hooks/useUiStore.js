import { useDispatch, useSelector } from "react-redux";
import { onOpenDayModal, onCloseDayModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDayModalOpen } = useSelector((state) => state.ui);

  const openDayModal = () => {
    dispatch(onOpenDayModal());
  };

  const closeDayModal = () => {
    dispatch(onCloseDayModal());
  };

  return {
    //properties
    isDayModalOpen,

    //methods
    openDayModal,
    closeDayModal,
  };
};
