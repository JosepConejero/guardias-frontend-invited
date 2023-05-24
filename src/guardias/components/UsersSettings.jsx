/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import UsersBox from "../userSettings/UsersBox";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import { AppUserNameModal } from "../modals/AppUserNameModal";

export const UsersSettings = () => {
  const { startLoadingAppUsers } = useAppUsersStore();

  useEffect(() => {
    startLoadingAppUsers();
  }, []);
  return (
    <>
      <UsersBox />
      <AppUserNameModal />
    </>
  );
};
