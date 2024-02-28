import UsersBox from "./UsersBox";
import { AppUserNameModal } from "../modals/AppUserNameModal";
import { BasicModal } from "../modals/basicModal/BasicModal";
import { useAppUsersStore, useUiStore } from "../../hooks";
import { useSelector } from "react-redux";
import { Spinner } from "../customizedComponents";
import { RootState } from "../../store";

export const UsersSettings = (): JSX.Element => {
  const { closeAppUserModal } = useUiStore();
  const { isAppUsersModalOpen } = useSelector((state: RootState) => state.ui);
  const { isDeletingAppUser } = useAppUsersStore();

  if (isDeletingAppUser) return <Spinner text="Borrando..." />;

  return (
    <>
      <UsersBox />
      <BasicModal isOpen={isAppUsersModalOpen} closeModal={closeAppUserModal}>
        {/*  <AppUserNameModal closeModal={closeAppUserModal} /> */}
        <AppUserNameModal />
      </BasicModal>
    </>
  );
};
