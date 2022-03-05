import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SectionDescription from "../components/SectionDescription";
import { ThemeProvider } from "@mui/material";

import theme from "../utils/theme";

const LeaderInterviews: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <SectionDescription
        title="Leader Interviews"
        desc="Here we describe the objectivs of the project and tell readers what we
        mainly post here. There is also small description of all the authors and
        so on"
      />
      <Footer />
    </ThemeProvider>
  );
};

export default LeaderInterviews;
