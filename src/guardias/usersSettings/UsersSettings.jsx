import UsersBox from "./UsersBox";
import { AppUserNameModal } from "../modals/AppUserNameModal";
import { BasicModal } from "../modals/basicModal/BasicModal";
import { useAppUsersStore, useUiStore } from "../../hooks";
import { useSelector } from "react-redux";
import { Spinner } from "../customizedComponents";

export const UsersSettings = () => {
  const { closeAppUserModal } = useUiStore();
  const { isAppUsersModalOpen } = useSelector((state) => state.ui);
  const { isDeletingAppUser } = useAppUsersStore();

  if (isDeletingAppUser) return <Spinner text="Borrando..." />;

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
