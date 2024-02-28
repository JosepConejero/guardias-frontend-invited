import { useDispatch, useSelector } from "react-redux";

import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";
import {
  onDeleteAppUser,
  onEmptyAppUsers,
  onLoadAppUsers,
  onSetActiveAppUser,
  onSetDeletingAppUser,
  onSetInactiveAppUser,
  onUpdateAppUser,
} from "../store/appUser/appUserSlice";
import { deletePassword } from "../helpers/deletePassword";
import { useState } from "react";
import { RootState } from "../store";
import {
  DayTechnician,
  TechnicianIdObject,
  TechnicianOut,
  useAppUsersStoreReturnTypes,
  User,
  UserShortName,
} from "../interfaces";

export const useAppUsersStore = () => {
  const dispatch = useDispatch();
  const { appUsers, activeAppUser, isDeletingAppUser } = useSelector(
    (state: RootState) => state.appUser
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const getTechniciansShortNames = (): string[] => {
    let techniciansShortNames: string[] = [];
    techniciansShortNames = appUsers
      .filter((technician: User) => technician.isTechnician)
      .map((technician: User) => technician.shortName);
    return techniciansShortNames;
  };

  const getTeachers = () => {
    let teachers: UserShortName[] = [];
    teachers = appUsers
      .filter((teacher: User) => teacher.isTechnician || teacher.isExternal)
      .map(({ id, shortName }: User) => ({ id, shortName }));
    return teachers;
  };

  const teachers = getTeachers();

  const techniciansShortNames = getTechniciansShortNames();

  const technicianShortNameById = (id: string): string => {
    const found: User = appUsers?.find(
      (technician: User) => technician.id === id
    );
    return found?.shortName;
  };

  const getTechniciansOutShortNames = (
    techniciansOut: TechnicianOut[]
  ): string[] => {
    let techniciansOutShortNames: string[] = [];
    techniciansOut.forEach((technician: TechnicianOut) => {
      techniciansOutShortNames = [
        ...techniciansOutShortNames,
        technicianShortNameById(technician.technicianId),
      ];
    });
    return [...techniciansOutShortNames];
  };

  /*   const getTechniciansInShortNames = (
    allTechnicians: User[],
    techniciansOut: TechnicianOut[]
  ) => {
    let techniciansIn: TechnicianIn[] = [];
    allTechnicians.forEach((technician) => {
      if (!techniciansOut.includes(technician)) {
        techniciansIn.push(technician);
      }
    });
    return [...techniciansIn];
  }; */

  const isIn = (
    teacherId: string,
    techniciansOut: TechnicianIdObject[]
  ): boolean => {
    let found = false;
    for (let i = 0; i < techniciansOut.length; i++) {
      if (techniciansOut[i].technicianId === teacherId) {
        found = true;
        return found;
      }
    }
    return found;
  };

  const getTeachersIn = (
    techniciansOut: TechnicianIdObject[]
  ): UserShortName[] => {
    let teachersIn: UserShortName[] = [];
    teachers.forEach((teacher: UserShortName) => {
      if (!isIn(teacher.id, techniciansOut)) {
        teachersIn.push(teacher);
      }
    });
    return [...teachersIn];
  };

  const getTeacherById = (technicianId: string): UserShortName | undefined => {
    for (let i = 0; i < teachers.length; i++) {
      if (teachers[i].id === technicianId) {
        return teachers[i];
      }
    }
  };

  const technicianIdByShortName = (shortName: string): string | undefined => {
    const found: User = appUsers?.find(
      (technician: User) => technician.shortName === shortName
    );
    return found?.id;
  };

  const getTechniciansOutIdsByShortName = (
    techniciansOutShortNames: string[]
  ): TechnicianIdObject[] => {
    return techniciansOutShortNames.map(
      (technicianShortName: string): TechnicianIdObject => ({
        technicianId: technicianIdByShortName(technicianShortName)!,
      })
    );
  };

  const getTechniciansInIdsByShortName = (
    techniciansInShortNames: string[]
  ): TechnicianIdObject[] => {
    return techniciansInShortNames.map((technicianShortName: string) => ({
      technicianId: technicianIdByShortName(technicianShortName)!,
    }));
  };

  const emptyTeachersName = (teachers: DayTechnician[] = []): boolean => {
    let emptyTeacher: boolean = false;
    teachers.forEach((teacher: DayTechnician) => {
      if (teacher.technicianId === null) emptyTeacher = true;
    });
    return emptyTeacher;
  };

  const setActiveAppUser = (appUser: User): void => {
    dispatch(onSetActiveAppUser(appUser));
  };

  const setInactiveAppUser = (): void => {
    dispatch(onSetInactiveAppUser());
  };

  const startLoadingAppUsers = async (): Promise<void> => {
    try {
      const { data } = await calendarApi.get("/users");
      const newUsers = deletePassword(data.usuarios);
      dispatch(onLoadAppUsers(newUsers));
    } catch (error: any) {
      ///any
      console.log("Error cargando usuarios");
      console.log(error);
    }
  };

  const startSavingAppUser = async (appUser: User): Promise<void> => {
    try {
      setIsSaving(true);
      if (appUser.id) {
        await calendarApi.put(`/users/${appUser.id}`, appUser);
        dispatch(onUpdateAppUser({ ...appUser }));
        setIsSaving(false);
        return;
      }
      setIsSaving(false);
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        "Error al actualizar un usuario",
        error.response.data?.msg,
        "error"
      );
    }
  };

  const startDeletingAppUser = async (appUser: User): Promise<void> => {
    try {
      dispatch(onSetDeletingAppUser(true));
      await calendarApi.delete(`/users/${appUser.id}`);
      dispatch(onDeleteAppUser(appUser));
      dispatch(onSetDeletingAppUser(false));
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        "Error al eliminar un usuario",
        error.response.data?.msg,
        "error"
      );
    }
  };

  const emptyAppUsers = (): void => {
    dispatch(onEmptyAppUsers());
  };

  const getAppUserData = (id: string): User | undefined => {
    if (appUsers.length === 0) return;
    return appUsers.find((appUser: User) => appUser.id === id);
  };

  //console.log(activeAppUser);

  return {
    //properties
    appUsers,
    techniciansShortNames,
    activeAppUser,
    teachers,
    isSaving,
    isDeletingAppUser,
    //methods
    setActiveAppUser,
    setInactiveAppUser,
    getTechniciansOutShortNames,
    technicianIdByShortName,
    getTechniciansOutIdsByShortName,
    getTechniciansInIdsByShortName,
    startSavingAppUser,
    startLoadingAppUsers,
    startDeletingAppUser,
    getTeachersIn,
    getTeacherById,
    emptyTeachersName,
    emptyAppUsers,
    getAppUserData,
    technicianShortNameById,
  } as useAppUsersStoreReturnTypes;
};
