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
        sx={{
          backgroundColor: "secondary.main",
          marginTop: "7vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90vw",
          }}
        >
          <Box>
            <img src={ucuLogo} style={{ position: "relative" }} />
            <img
              src={fsnLogo}
              style={{ position: "relative", width: "400px" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              width: 200,
            }}
          >
            <Typography variant="h4" sx={{ color: "white", marginBottom: 2 }}>
              Partner projects
            </Typography>
            <Typography variant="body1">
              <a
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "400",
                }}
                href="https://www.weareukraine.info/?fbclid=IwAR1-EP6YgUVdN5ROpplm9BRMikxhF3UQbMdvp4La2DnGlKpVe3agtKxMw1U"
              >
                WeAreUkraine.info
              </a>
            </Typography>
            <Typography variant="body1">
              <a
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "400",
                }}
                href="https://betha.in.ua"
              >
                Betha.in.ua
              </a>
            </Typography>
            <Typography variant="body1">
              <a
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "400",
                }}
                href="https://warinua.ucu.edu.ua/ucu-student-projects/"
              >
                Warinua.ucu.edu.ua
              </a>
            </Typography>
            <Typography variant="body1">
              <a
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "400",
                }}
                href="https://ucu.edu.ua/en/"
              >
                UCU Website
              </a>
            </Typography>
            <Typography variant="body1">
              <a
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "400",
                }}
                href="https://uccmc.org"
              >
                UCCMC
              </a>
            </Typography>
            <Typography variant="body1">
              <a
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "400",
                }}
                href="https://post-to-stop-war.in.ua"
              >
                Post To Stop War
              </a>
            </Typography>
          </Box>
        </Box>
        <Typography color="white" sx={{ top: "85%" }}>
          For more details contact us:{" "}
          <a
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "400",
            }}
            href="mailto:sjc@ucu.edu.ua"
          >
            sjc@ucu.edu.ua
          </a>
        </Typography>
        <Typography color="white">
          All rights reserved © 2022 Ukrainian Catholic University
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
