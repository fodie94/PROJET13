// MainContentUser.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFirstName, setLastName } from "../../redux/reduxtest";

const MainContentUser = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstNameLocal] = useState("");
  const [lastName, setLastNameLocal] = useState("");

  const handleEditName = () => {
    setEditMode(true);
  };

  const handleFirstNameChange = (e) => {
    setFirstNameLocal(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastNameLocal(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const apiUrl = "http://localhost:3001/api/v1/user/profile";
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName: firstName, lastName: lastName }),
      });

      const data = await response.json();

      dispatch(setFirstName(firstName));
      dispatch(setLastName(lastName));
      setEditMode(false);

      console.log("Profil utilisateur mis à jour avec succès :", data);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du profil utilisateur :",
        error.message
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:3001/api/v1/user/profile";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        const { firstName, lastName } = data.body;

        setFirstNameLocal(firstName);
        setLastNameLocal(lastName);

        console.log("Profil utilisateur mis à jour avec succès :", data);
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour du profil utilisateur :",
          error.message
        );
      }
    };

    fetchData();
  }, [dispatch, token]);

  console.log("Après la requête POST");

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Bienvenue
          <br />
          {`${firstName} ${lastName} !`}
        </h1>
      </div>
      {!editMode && (
        <button className="edit-button" onClick={handleEditName}>
          Modifier le nom
        </button>
      )}
      {editMode && (
        <div className="userName">
          <div className="userInput">
            <input
              type="text"
              placeholder="Nouveau prénom"
              value={firstName}
              onChange={handleFirstNameChange}
            />

            <input
              type="text"
              placeholder="Nouveau nom"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="userButton">
            <button className="edit-button" onClick={handleSaveChanges}>
              Enregistrer
            </button>
            <button className="edit-button" onClick={() => setEditMode(false)}>
              Annuler
            </button>
          </div>
        </div>
      )}
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default MainContentUser;
