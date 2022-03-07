import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";
import ucuLogo from "../assets/ucu_logo.svg";
import fsnLogo from "../assets/inFSN.png";
import theme from "../utils/theme";

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        height={"50vh"}
        sx={{ backgroundColor: "secondary.main", marginTop: "7vh" }}
      >
        <img src={ucuLogo} style={{ position: "relative" }} />
        <img src={fsnLogo} style={{ position: "relative", width: "400px" }} />
        <Typography color="white" sx={{ top: "85%" }}>
          All rights reserved © 2022 Ukrainian Catholic University
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
