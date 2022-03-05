import React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import { Button } from "@mui/material";
import theme from "../utils/theme";
import "./Header.css";

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="header">
        <h2>Project Name</h2>
        <Button
          variant="contained"
          color="primary"
          target="_blank"
          href="https://betha.in.ua"
        >
          Support
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default Header;
