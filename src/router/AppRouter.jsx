/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { GuardiasPage } from "../guardias/pages/GuardiasPage";
import { LogoPage } from "../ui";
import { useAppUsersStore, useAuthStore } from "../hooks";
import { useEffect } from "react";
import { SettingsPage } from "../guardias/pages/SettingsPage";
import { Spinner } from "../guardias/customizedComponents/Spinner";

export const AppRouter = () => {
  //  const authStatus = "authenticated"; // "not-authenticated"; "checking";
  //const authStatus = "not-authenticated";
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <Spinner text="Loading..." />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LogoPage />} />
        {status === "not-authenticated" ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/guardias" element={<GuardiasPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/*" element={<Navigate to="/guardias" />} />
          </>
        )}
      </Routes>
    </>
  );
};
