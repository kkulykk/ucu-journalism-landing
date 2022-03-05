import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionDescription from "../components/SectionDescription";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import { HistoryVideo } from "../components/HistoryVideo";
import Box from "@mui/material/Box";

const WarHisttory: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <SectionDescription
        title="War History"
        desc="Here we describe the objectivs of the project and tell readers what we
        mainly post here. There is also small description of all the authors and
        so on"
      />
      <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
        <HistoryVideo
          title="Ukraine strongly needs your support!"
          date="25 Feb 2022"
          videoUrl="https://www.youtube.com/embed/sL7Lh3x3Tfk"
        />
        <HistoryVideo
          title="Ukraine strongly needs your support!"
          date="25 Feb 2022"
          videoUrl="https://www.youtube.com/embed/sL7Lh3x3Tfk"
        />
        <HistoryVideo
          title="Ukraine strongly needs your support!"
          date="25 Feb 2022"
          videoUrl="https://www.youtube.com/embed/sL7Lh3x3Tfk"
        />
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default WarHisttory;
