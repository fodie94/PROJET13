// MainContentUser.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrenom, setNom } from "../../redux/reduxSlice";

const MainContentUser = () => {
  const dispatch = useDispatch();
  const { prenom, nom, token } = useSelector((state) => state.user);

  const [editMode, setEditMode] = useState(false);
  const [nouveauPrenom, setNouveauPrenom] = useState(prenom);
  const [nouveauNom, setNouveauNom] = useState(nom);

  const handleEditName = () => {
    setEditMode(true);
  };
  const handleSave = () => {
    const apiUrl = "http://localhost:3001/api/v1/user/profile";
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Inclure le jeton Bearer dans l'en-tête
      },
      body: JSON.stringify({
        firstName: nouveauPrenom,
        lastName: nouveauNom,
      }),
    });
    dispatch(setPrenom(nouveauPrenom));
    dispatch(setNom(nouveauNom));

    localStorage.setItem("prenom", nouveauPrenom);
    localStorage.setItem("nom", nouveauNom);
    // Puis désactivez le mode d'édition
    setEditMode(false);
  };
  console.log(useSelector((state) => state.user));
  // Effectuer la requête POST vers /user/profile ici
  const apiUrl = "http://localhost:3001/api/v1/user/profile";
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Inclure le jeton Bearer dans l'en-tête
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Profil utilisateur mis à jour avec succès :", data);
      dispatch(setPrenom(data.body.firstName));
      dispatch(setNom(data.body.lastName));
      localStorage.setItem("prenom", data.body.firstName);
      localStorage.setItem("nom", data.body.lastName);
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la mise à jour du profil utilisateur :",
        error.message
      );
    });
  console.log("Après la requête POST"); // Ajoutez ce point de contrôle

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Bienvenue
          <br />
          {`${prenom} ${nom} !`}
        </h1>
        {!editMode && (
          <button className="edit-button" onClick={handleEditName}>
            Modifier le nom
          </button>
        )}
        {/* Afficher les champs d'entrée en mode d'édition */}
        {editMode && (
          <div className="userName">
            <div className="userInput">
              <input
                type="text"
                placeholder="Nouveau prénom"
                value={nouveauPrenom}
                onChange={(e) => setNouveauPrenom(e.target.value)}
              />

              <input
                type="text"
                placeholder="Nouveau nom"
                value={nouveauNom}
                onChange={(e) => setNouveauNom(e.target.value)}
              />
            </div>
            <div className="userButton">
              <button className="edit-button" onClick={handleSave}>
                Enregistrer
              </button>
              <button
                className="edit-button"
                onClick={() => setEditMode(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
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
