import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/reduxSlice";
//import { setToken } from "../../redux/reduxtest";
import { Navigate } from "react-router-dom";
import axios from "axios"; // Importer Axios

const MainContentSign = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { token } = useSelector((state) => state.user);

  const fetchData = async (apiUrl, loginData) => {
    try {
      const response = await axios.post(apiUrl, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        setError(true);
        throw new Error("Erreur du serveur");
      } else {
        const userData = response.data;
        console.log("Informations utilisateur login :", userData);
        const currentToken = userData.body.token;
        console.log("Informations token :", currentToken);

        dispatch(setToken(currentToken));
        setIsLoggedIn(true);
        return userData;
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error.message);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      alert("Veuillez remplir tous les champs de connexion.");
      return;
    }

    fetchData("http://localhost:3001/api/v1/user/login", {
      username,
      password,
    });
  };

  if (isLoggedIn) {
    return <Navigate to="/PageUser" />;
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <span>les identifiants sont faux</span>}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default MainContentSign;
