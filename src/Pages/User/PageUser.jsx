import React from "react";
import HeaderUser from "../../components/HeaderUser";
import MainContentUser from "./MainContentUser";
import Footer from "../../components/Footer";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//import MainContentUser from "./testUserName";
//import MainContentUser from "./userTest";
const PageUser = () => {
  const { token } = useSelector((state) => state.user);
  if (token) {
    return (
      <div>
        <HeaderUser />
        <MainContentUser />
        <Footer />
      </div>
    );
  } else {
    return <Navigate to="/PageSign" />;
  }
};

export default PageUser;
