import React from "react";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <div>
      <Link to={"/world"}>World About Ukraine</Link>
    </div>
  );
};

export default MainPage;
