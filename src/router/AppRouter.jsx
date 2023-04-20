import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { GuardiasPage } from "../guardias/pages/GuardiasPage";
import { LogoPage } from "../ui";

export const AppRouter = () => {
  //  const authStatus = "authenticated";
  const authStatus = "not-authenticated";

  return (
    <>
      <Routes>
        <Route path="/" element={<LogoPage />} />
        {authStatus === "not-authenticated" ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/guardias" element={<GuardiasPage />} />
            <Route path="/*" element={<Navigate to="/guardias" />} />
          </>
        )}
      </Routes>
    </>
  );
};
