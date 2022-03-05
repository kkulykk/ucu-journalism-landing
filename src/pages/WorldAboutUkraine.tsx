import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionDescription from "../components/SectionDescription";
import { ThemeProvider } from "@mui/material";

import theme from "../utils/theme";

const WorldAboutUkraine: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <SectionDescription
        title="World About Ukraine"
        desc="Here we describe the objectivs of the project and tell readers what we
        mainly post here. There is also small description of all the authors and
        so on"
      />
      <Footer />
    </ThemeProvider>
  );
};

export default WorldAboutUkraine;
