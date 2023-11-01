import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  onChecking,
  onClearErrorMessage,
  onLogin,
  onLogout,
  onSetChangingPassword,
  onSetRestoringPassword,
} from "../store/auth/authSlice";

import Swal from "sweetalert2";
import { useCoursesStore } from "./useCoursesStore";
import { useAppUsersStore } from "./useAppUsersStore";
import {
  resetShowRestoreAllUsersButton,
  resetShowStatistics,
} from "../store/month/monthSlice";

export const useAuthStore = () => {
  const {
    status,
    user,
    errorMessage,
    isChangingPassword,
    isRestoringPassword,
  } = useSelector((state) => state.auth);
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
      if (data.isStillWorking) {
        if (data.isActivated) {
          dispatch(
            onLogin({
              name: data.name,
              uid: data.uid,
              shortName: data.shortName,
              email,
              canFLC: data.canFLC,
              canSeeStatistics: data.canSeeStatistics,
              isActivated: data.isActivated,
              isAdmin: data.isAdmin,
              isDataModifier: data.isDataModifier,
              isStillWorking: data.isStillWorking,
              isTechnician: data.isTechnician,
            })
          );
        } else {
          Swal.fire({
            title: "Su usuario todavía no está activado.",
            text: "Por favor, hable con el administrador para que lo active.",
            icon: "error",
          });
          dispatch(onLogout());
        }
      } else {
        Swal.fire({
          title: "No tiene permiso para acceder.",
          text: "Usted ya no trabaja en esta empresa.",
          icon: "error",
        });
        dispatch(onLogout());
      }
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

      Swal.fire({
        title: "Avise al administrador para que active su usuario.",

        icon: "info",
      });
      dispatch(onLogout());
    } catch (error) {
      dispatch(
        onLogout(error.response.data?.msg || "Se ha producido un error")
      );
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const updatePassword = async ({ email, password, password2 }) => {
    try {
      dispatch(onSetChangingPassword(true));
      const { data } = await calendarApi.patch("/auth/", {
        email,
        password,
        newPassword: password2,
      });
      dispatch(onSetChangingPassword(false));
      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error al cambiar la contraseña",
        text: error.response.data?.msg,
        icon: "error",
      });
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const startRestoringPassword = async ({ id }) => {
    try {
      dispatch(onSetRestoringPassword(true));
      const { data } = await calendarApi.patch(`/auth/${id}`);
      dispatch(onSetRestoringPassword(false));
      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error al restaurar la contraseña",
        text: error.response.data?.msg,
        icon: "error",
      });
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
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
          email: data.email,
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
      console.log("Es el error del renew");
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
    dispatch(resetShowRestoreAllUsersButton());
  };

  return {
    // properties
    errorMessage,
    status,
    user,
    isChangingPassword,
    isRestoringPassword,
    // methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
    updatePassword,
    startRestoringPassword,
  };
};
