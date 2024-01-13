// reduxtest.jsx

import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    isConnected: false,
    firstName: null,
    lastName: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isConnected = !!action.payload;
      localStorage.setItem("token", action.payload);
    },
    setAuthenticated: (state, action) => {
      state.isConnected = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
      localStorage.setItem("firstName", action.payload);
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
      localStorage.setItem("lastName", action.payload);
    },
  },
});

export const { setToken, setAuthenticated, setFirstName, setLastName } =
  userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
