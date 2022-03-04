import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./MainPage.css";

const MainPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="photo-of-day"></div>
    </div>
  );
};

export default MainPage;
