import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        height={"40vh"}
        sx={{ backgroundColor: "secondary.main", marginTop: "7vh" }}
      ></Box>
    </ThemeProvider>
  );
};

export default Footer;
