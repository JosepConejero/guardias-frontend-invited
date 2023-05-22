import { useEffect } from "react";
import UsersBox from "../userSettings/UsersBox";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";

export const UsersSettings = () => {
  //const { openCourseModal } = useUiStore();
  const { startLoadingAppUsers } = useAppUsersStore();

  /* const onAddCourse = () => {
    console.log("añade curso");
    //abre el modal
    openCourseModal();
  }; */

  useEffect(() => {
    startLoadingAppUsers();
  }, []);
  return (
    <>
      <UsersBox />
    </>
  );
};
