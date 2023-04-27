import { Link } from "react-router-dom";

export const LogoPage = () => {
  return (
    <>
      <div className="logo-container animate__animated animate__fadeIn animate__faster">
        <Link to="/login">
          <img src="/assets/logo.png" alt="logo de MPE"></img>
        </Link>
      </div>
    </>
  );
};
