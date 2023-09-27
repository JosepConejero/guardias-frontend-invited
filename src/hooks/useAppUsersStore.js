import { useDispatch, useSelector } from "react-redux";

import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";
import {
  onDeleteAppUser,
  onLoadAppUsers,
  onSetActiveAppUser,
  onSetInactiveAppUser,
  onUpdateAppUser,
  onEmptyAppUsers,
  onSetDeletingAppUser,
} from "../store/appUser/appUserSlice";
import { deletePassword } from "../helpers/deletePassword";
import { useState } from "react";

export const useAppUsersStore = () => {
  const dispatch = useDispatch();
  const { appUsers, activeAppUser, isDeletingAppUser } = useSelector(
    (state) => state.appUser
  );
  const [isSaving, setIsSaving] = useState(false);

  const getTechniciansShortNames = () => {
    let techniciansShortNames = [];
    techniciansShortNames = appUsers
      .filter((technician) => technician.isTechnician)
      .map((technician) => technician.shortName);
    return techniciansShortNames;
  };

  const getTeachers = () => {
    let teachers = [];
    teachers = appUsers
      .filter((teacher) => teacher.isTechnician || teacher.isExternal)
      .map(({ id, shortName }) => ({ id, shortName }));
    return teachers;
  };

  const teachers = getTeachers();

  const techniciansShortNames = getTechniciansShortNames();

  const technicianShortNameById = (id) => {
    const found = appUsers?.find((technician) => technician.id === id);
    return found?.shortName;
  };

  const getTechniciansOutShortNames = (techniciansOut) => {
    let techniciansOutShortNames = [];
    techniciansOut.forEach((technician) => {
      techniciansOutShortNames = [
        ...techniciansOutShortNames,
        technicianShortNameById(technician.technicianId),
      ];
    });
    return [...techniciansOutShortNames];
  };

  const getTechniciansInShortNames = (allTechnicians, techniciansOut) => {
    let techniciansIn = [];
    allTechnicians.forEach((technician) => {
      if (!techniciansOut.includes(technician)) {
        techniciansIn.push(technician);
      }
    });
    return [...techniciansIn];
  };

  const isIn = (teacherId, techniciansOut) => {
    let found = false;
    for (let i = 0; i < techniciansOut.length; i++) {
      if (techniciansOut[i].technicianId === teacherId) {
        found = true;
        return found;
      }
    }
    return found;
  };

  const getTeachersIn = (techniciansOut) => {
    let teachersIn = [];
    teachers.forEach((teacher) => {
      if (!isIn(teacher.id, techniciansOut)) {
        teachersIn.push(teacher);
      }
    });
    return [...teachersIn];
  };

  const getTeacherById = (technicianId) => {
    for (let i = 0; i < teachers.length; i++) {
      if (teachers[i].id === technicianId) {
        return teachers[i];
      }
    }
  };

  const technicianIdByShortName = (shortName) => {
    const found = appUsers?.find(
      (technician) => technician.shortName === shortName
    );
    return found?.id;
  };

  const getTechniciansOutIdsByShortName = (techniciansOutShortNames) => {
    return techniciansOutShortNames.map((technicianShortName) => ({
      technicianId: technicianIdByShortName(technicianShortName),
    }));
  };

  const getTechniciansInIdsByShortName = (techniciansInShortNames) => {
    return techniciansInShortNames.map((technicianShortName) => ({
      technicianId: technicianIdByShortName(technicianShortName),
    }));
  };

  const emptyTeachersName = (teachers) => {
    let emptyTeacher = false;
    teachers.forEach((teacher) => {
      if (teacher.technicianId === null) emptyTeacher = true;
    });
    return emptyTeacher;
  };

  const setActiveAppUser = (appUser) => {
    dispatch(onSetActiveAppUser(appUser));
  };

  const setInactiveAppUser = () => {
    dispatch(onSetInactiveAppUser());
  };

  const startLoadingAppUsers = async () => {
    try {
      const { data } = await calendarApi.get("/users");
      const newUsers = deletePassword(data.usuarios);
      dispatch(onLoadAppUsers(newUsers));
    } catch (error) {
      console.log("Error cargando usuarios");
      console.log(error);
    }
  };

  const startSavingAppUser = async (appUser) => {
    try {
      setIsSaving(true);
      if (appUser.id) {
        await calendarApi.put(`/users/${appUser.id}`, appUser);
        dispatch(onUpdateAppUser({ ...appUser }));
        setIsSaving(false);
        return;
      }
      /* const { data } = await calendarApi.post("/courses", appUser);
      //console.log({ data });
      dispatch(onAddNewAppUser({ ...appUser, id: data.curso.id })); //sería usuario en vez de curso */
      setIsSaving(false);
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
      dispatch(onSetDeletingAppUser(true));
      await calendarApi.delete(`/users/${appUser.id}`);
      dispatch(onDeleteAppUser(appUser));
      dispatch(onSetDeletingAppUser(false));
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al eliminar un usuario",
        error.response.data?.msg,
        "error"
      );
    }
  };

  const emptyAppUsers = () => {
    dispatch(onEmptyAppUsers());
  };

  const getAppUserData = (id) => {
    if (appUsers.length === 0) return;
    return appUsers.find((appUser) => appUser.id === id);
  };

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
    getTechniciansInShortNames,
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
  };
};
