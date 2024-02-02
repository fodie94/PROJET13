import React from "react";
import Header from "../../components/Header";
import MainContentIndex from "./MainContentIndex";
import Footer from "../../components/Footer";
import Banner from "./Banner";
const PageIndex = () => {
  return (
    <div>
      <Header />
      <Banner />
      <MainContentIndex />
      <Footer />
    </div>
  );
};

export default PageIndex;
