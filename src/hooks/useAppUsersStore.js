import { useDispatch, useSelector } from "react-redux";

import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";
import {
  onDeleteAppUser,
  onLoadAppUsers,
  onSetActiveAppUser,
  onSetInactiveAppUser,
  onUpdateAppUser,
} from "../store/appUser/appUserSlice";

export const useAppUsersStore = () => {
  const dispatch = useDispatch();
  const { appUsers, activeAppUser } = useSelector((state) => state.appUser);

  const setActiveAppUser = (course) => {
    dispatch(onSetActiveAppUser(course));
  };

  const setInactiveAppUser = () => {
    dispatch(onSetInactiveAppUser());
  };

  const startLoadingAppUsers = async () => {
    try {
      //const { data } = await calendarApi.get("/courses");//sería /users?????
      //dispatch(onLoadAppUsers(data.cursos));//cursos sería usuarios????
    } catch (error) {
      console.log("Error cargando usuarios");
      console.log(error);
    }
  };

  const startSavingAppUser = async (appUser) => {
    try {
      if (appUser.id) {
        //await calendarApi.put(`/courses/${appUser.id}`, appUser); //sería usuarios en vez de courses
        //dispatch(onUpdateAppUser({ ...appUser }));
        return;
      }
      /* const { data } = await calendarApi.post("/courses", appUser);
      //console.log({ data });
      dispatch(onAddNewAppUser({ ...appUser, id: data.curso.id })); //sería usuario en vez de curso */
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al actualizar un usuario",
        error.response.data?.msg,
        "error"
      );
    }
  };

  const startDeletingAppUser = async (appUser) => {
    try {
      //await calendarApi.delete(`/courses/${appUser.id}`); //sería users en vez de courses
      //dispatch(onDeleteAppUser(appUser));
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al eliminar un usuario",
        error.response.data?.msg,
        "error"
      );
    }
  };

  return {
    //properties
    appUsers,
    activeAppUser,
    //methods
    setActiveAppUser,
    setInactiveAppUser,
    startSavingAppUser,
    startLoadingAppUsers,
    startDeletingAppUser,
  };
};
