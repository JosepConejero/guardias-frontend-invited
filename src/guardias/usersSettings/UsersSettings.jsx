import UsersBox from "./UsersBox";
import { AppUserNameModal } from "../modals/AppUserNameModal";
import { BasicModal } from "../modals/basicModal/BasicModal";
import { useUiStore } from "../../hooks";
import { useSelector } from "react-redux";

export const UsersSettings = () => {
  const { closeAppUserModal } = useUiStore();
  const { isAppUsersModalOpen } = useSelector((state) => state.ui);
  return (
    <>
      <UsersBox />
      {/* <AppUserNameModal /> */}
      <BasicModal isOpen={isAppUsersModalOpen} closeModal={closeAppUserModal}>
        <AppUserNameModal closeModal={closeAppUserModal} />
      </BasicModal>
    </>
  );
};
