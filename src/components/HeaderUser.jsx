// HeaderUser.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/reduxSlice";
import argentBankLogo from "../assets/argentBankLogo.png";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const HeaderUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, prenom } = useSelector((state) => state.user);
  console.log(prenom);

  const handleSignOut = () => {
    dispatch(setToken(null));
    localStorage.removeItem("prenom");
    localStorage.removeItem("token");

    navigate("/PageIndex");
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
        {token ? (
          <>
            <Link className="main-nav-item">
              <FaUserCircle className="icon" /> {/* Logout Icon */}
              {`${prenom} `}
            </Link>
            <Link
              className="main-nav-item"
              to="/PageSign"
              onClick={handleSignOut}
            >
              <FaSignOutAlt className="icon" /> {/* Logout Icon */}
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/PageSign">
            <FaUserCircle className="icon" /> {/* Logout Icon */}
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default HeaderUser;
