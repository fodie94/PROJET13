import { configureStore, createSlice } from "@reduxjs/toolkit";

// Fonction utilitaire pour obtenir les données initiales depuis le stockage local
const getInitialUserData = () => {
  const savedNom = localStorage.getItem("nom");
  const savedPrenom = localStorage.getItem("prenom");
  const savedToken = localStorage.getItem("token");

  // Utilisation d'une valeur booléenne pour isConnected
  const isConnected = savedToken ? true : false; // Vérifiez si un token est présent pour déterminer l'état de connexion

  return {
    prenom: savedPrenom,
    nom: savedNom,
    isConnected: isConnected,
    token: savedToken,
  };
};

// Slice pour les informations de l'utilisateur
const userSlice = createSlice({
  name: "user",
  initialState: getInitialUserData(), // Utiliser la fonction pour obtenir les données initiales
  reducers: {
    setPrenom: (state, action) => {
      state.prenom = action.payload;
      localStorage.setItem("prenom", action.payload); // Sauvegarder dans le stockage local
    },
    setNom: (state, action) => {
      state.nom = action.payload;
      localStorage.setItem("nom", action.payload); // Sauvegarder dans le stockage local
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isConnected = !!action.payload; // Mettez à jour l'état de connexion en fonction de la présence du token
      localStorage.setItem("token", action.payload); // Sauvegarder le token dans le stockage local
    },
    // Nouvelle action pour gérer l'état de connexion
    setAuthenticated: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

// Exportez les actions du slice
export const { setPrenom, setNom, setToken, setAuthenticated } =
  userSlice.actions;

// Configurez le store avec le reducer du slice
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
