// Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/reduxtest";
import argentBankLogo from "../assets/argentBankLogo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, prenom } = useSelector((state) => state.user);
  console.log(prenom);
  const handleSignOut = () => {
    dispatch(setToken(null));
    localStorage.removeItem("token");

    navigate("/PageSign");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/PageIndex">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="main-nav-droite">
        {!token ? (
          <Link className="main-nav-item" to="/PageSign">
            Sign Up
          </Link>
        ) : (
          <>
            <Link className="main-nav-item" to="/PageUser">
              <i className="fa fa-user-circle"></i>
              {`${prenom} `}
            </Link>
            <Link className="main-nav-item" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
