import { Link } from "react-router-dom";

export const LogoPage = () => {
  return (
    <>
      <div className="logo-container">
        <Link to="/login">
          <img src="/assets/logo.png" alt="logo de MPE"></img>
        </Link>
      </div>
    </>
  );
};
