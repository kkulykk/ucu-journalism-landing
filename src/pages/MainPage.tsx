import React from "react";
import { Link } from "react-router-dom";
import { getData } from "../services/firebase/firestore";

const MainPage: React.FC = () => {
  const a = getData().then((res) => {
    console.log(res)
  });
  
  return (
    <div>
      <Link to={"/world"}>World About Ukraine</Link>
    </div>
  );
};

export default MainPage;
