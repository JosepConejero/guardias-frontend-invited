import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  onChecking,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
//import Swal from "sweetalert2";
import { useCoursesStore } from "./useCoursesStore";
import { useAppUsersStore } from "./useAppUsersStore";
import { resetShowStatistics } from "../store/month/monthSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  // const { resetShowStatistics } = useSelector((state) => state.month);
  const { emptyCourses } = useCoursesStore();
  const { emptyAppUsers } = useAppUsersStore();

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
          shortName: data.shortName,
          canFLC: data.canFLC,
          canSeeStatistics: data.canSeeStatistics,
          isActivated: data.isActivated,
          isAdmin: data.isAdmin,
          isDataModifier: data.isDataModifier,
          isStillWorking: data.isStillWorking,
          isTechnician: data.isTechnician,
        })
      );
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
          shortName: data.shortName,
          canFLC: data.canFLC,
          canSeeStatistics: data.canSeeStatistics,
          isActivated: data.isActivated,
          isAdmin: data.isAdmin,
          isDataModifier: data.isDataModifier,
          isStillWorking: data.isStillWorking,
          isTechnician: data.isTechnician,
        })
      );
    } catch (error) {
      dispatch(
        onLogout(error.response.data?.msg || "Se ha producido un error")
      );
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      //Swal.fire("El token ya expiró", "Vuelva a hacer login", "error"); //esto podría no funcionar bien
      return dispatch(onLogout());
    }
    try {
      const { data } = await calendarApi.get("auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
          shortName: data.shortName,
          canFLC: data.canFLC,
          canSeeStatistics: data.canSeeStatistics,
          isActivated: data.isActivated,
          isAdmin: data.isAdmin,
          isDataModifier: data.isDataModifier,
          isStillWorking: data.isStillWorking,
          isTechnician: data.isTechnician,
        })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    emptyCourses();
    emptyAppUsers();

    localStorage.clear();
    dispatch(onLogout());
    dispatch(resetShowStatistics());
  };

  return {
    // properties
    errorMessage,
    status,
    user,
    // methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
