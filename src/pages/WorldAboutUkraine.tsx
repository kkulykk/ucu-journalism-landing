import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionDescription from "../components/SectionDescription";
import { ThemeProvider } from "@mui/material";

import theme from "../utils/theme";
import WorldArticle from "../components/WorldArticle";

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
      <WorldArticle
        title="News from the US"
        date="12 FEB"
        source="ABC"
        lead="hello"
        sourceUrl="https://abc.com"
        imageUrl="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
      />
      <Footer />
    </ThemeProvider>
  );
};

export default WorldAboutUkraine;
