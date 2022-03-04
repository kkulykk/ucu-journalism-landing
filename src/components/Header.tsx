import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";
import "./Header.css";

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="header">
        <h2>Project Name</h2>
      </div>
    </ThemeProvider>
  );
};

export default Header;
