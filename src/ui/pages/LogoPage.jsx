import { Link } from "react-router-dom";

export const LogoPage = () => {
  const clickHandler = () => {
    console.log("Se ha pulsado sobre el logo");
  };

  return (
    <>
      <div className="logo-container">
        <Link to="/login">
          <img
            onClick={clickHandler}
            src="/assets/logo.png"
            alt="logo de MPE"
          ></img>
        </Link>
      </div>
    </>
  );
};
