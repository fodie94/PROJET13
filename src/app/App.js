// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/reduxSlice"; // Remplacez par le chemin correct
import PageIndex from "../Pages/Index/PageIndex";
import PageUser from "../Pages/User/PageUser";
import PageSign from "../Pages/Sign/PageSign";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/PageIndex" />} />
          <Route path="/PageIndex" element={<PageIndex />} />
          <Route path="/PageUser" element={<PageUser />} />
          <Route path="/PageSign" element={<PageSign />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
