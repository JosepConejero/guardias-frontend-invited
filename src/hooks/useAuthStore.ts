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
import { UserWithUid } from "../interfaces";
import { StatusType } from "../types";
import { RootState } from "../store";
import { DataType } from "../types/DataType";

interface useAuthStoreReturnTypes {
  errorMessage: string;
  status: StatusType;
  user: UserWithUid;
  isChangingPassword: boolean;
  isRestoringPassword: boolean;
  startLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  startRegister: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  checkAuthToken: () => Promise<void | {
    payload: string | undefined;
    type: "auth/onLogout";
  }>;
  startLogout: () => void;
  updatePassword: ({
    email,
    password,
    password2,
  }: {
    email: string;
    password: string;
    password2: string;
  }) => Promise<DataType | void>;
  startRestoringPassword: ({ id }: { id: string }) => Promise<DataType | void>;
}

export const useAuthStore = () => {
  const {
    status,
    user,
    errorMessage,
    isChangingPassword,
    isRestoringPassword,
  } = useSelector((state: RootState) => state.auth);
  const { emptyCourses } = useCoursesStore();
  const { emptyAppUsers } = useAppUsersStore();

  const dispatch = useDispatch();

  const startLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    dispatch(onChecking());
    try {
      const { data }: { data: UserWithUid } = await calendarApi.post("/auth", {
        email,
        password,
      });

      const userInfoSended: UserWithUid = {
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
      };

      localStorage.setItem("token", data.token!);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      if (data.isStillWorking) {
        // if (data.isActivated) {
        dispatch(onLogin(userInfoSended));
        // } else {
        //   Swal.fire({
        //     title: "Su usuario todavía no está activado.",
        //     text: "Por favor, hable con el administrador para que lo active.",
        //     icon: "error",
        //   });
        //   dispatch(onLogout());
        // }
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

  const startRegister = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> => {
    dispatch(onChecking());

    try {
      const { data }: { data: UserWithUid } = await calendarApi.post(
        "/auth/new",
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("token", data.token!);
      localStorage.setItem("token-init-date", new Date().getTime().toString());

      Swal.fire({
        //title: "Avise al administrador para que active su usuario.",
        title: "Ya puede entrar desde el login con sus datos.",
        text: "Puede modificar cuanto desee, es una versión de prueba.",
        icon: "info",
      });
      dispatch(onLogout());
    } catch (error: any) {
      dispatch(
        onLogout(error.response.data?.msg || "Se ha producido un error")
      );
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const updatePassword = async ({
    email,
    password,
    password2,
  }: {
    email: string;
    password: string;
    password2: string;
  }): Promise<DataType | void> => {
    try {
      dispatch(onSetChangingPassword(true));
      const { data }: { data: DataType } = await calendarApi.patch("/auth/", {
        email,
        password,
        newPassword: password2,
      });
      dispatch(onSetChangingPassword(false));
      return data;
    } catch (error: any) {
      ///any
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

  const startRestoringPassword = async ({
    id,
  }: {
    id: string;
  }): Promise<void | DataType> => {
    try {
      dispatch(onSetRestoringPassword(true));
      const { data }: { data: DataType } = await calendarApi.patch(
        `/auth/${id}`
      );
      dispatch(onSetRestoringPassword(false));
      return data;
    } catch (error: any) {
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

  const checkAuthToken = async (): Promise<void | {
    payload: string | undefined;
    type: "auth/onLogout";
  }> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) {
      return dispatch(onLogout());
    }
    try {
      //type DataType = UserWithUid & { token: string };
      const { data }: { data: UserWithUid } = await calendarApi.get(
        "auth/renew"
      );
      localStorage.setItem("token", data.token!);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      const userInfoSended: UserWithUid = {
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
      };
      dispatch(onLogin(userInfoSended));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = (): void => {
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
  } as useAuthStoreReturnTypes;
};
