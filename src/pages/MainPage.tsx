import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import Header from "../components/Header";
import theme from "../utils/theme";
import "./MainPage.css";

const MainPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <div className="photo-of-day"></div>
      </div>
    </ThemeProvider>
  );
};

export default MainPage;
