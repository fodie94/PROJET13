// PageSign.jsx
import React from "react";
import Header from "../../components/Header";
import MainContentSign from "./MainContentSign";
import Footer from "../../components/Footer";

const PageSign = () => {
  return (
    <div>
      <Header />
      {/* Passez la propriété loginData à MainContentSign */}
      <MainContentSign />
      <Footer />
    </div>
  );
};

export default PageSign;
