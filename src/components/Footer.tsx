import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";
import ucuLogo from "../assets/ucu_logo.svg";
import fsnLogo from "../assets/logo_png.png";
import theme from "../utils/theme";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "secondary.main",
          marginTop: "7vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          [theme.breakpoints.down(850)]: {
            height: "auto",
            padding: "7%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "90vw",
            [theme.breakpoints.down(850)]: {
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              [theme.breakpoints.down(850)]: {
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "400",
                }}
                href=" https://ucu.edu.ua/en/"
                target="_blank"
              >
                <img
                  src={ucuLogo}
                  style={{
                    width: "200px",
                  }}
                />
                <p>UCU</p>
              </a>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                [theme.breakpoints.down(850)]: {
                  alignItems: "center",
                },
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "400",
                }}
                href="https://fss.ucu.edu.ua/ua/"
                target="_blank"
              >
                <img
                  src={fsnLogo}
                  style={{
                    width: "300px",
                    marginTop: "5px",
                  }}
                />
              </a>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "12px 0 0 5px",
                  alignItems: "flex-start",
                  [theme.breakpoints.down(850)]: {
                    margin: "20px 0",
                    alignItems: "center",
                  },
                }}
              >
                <a
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "400",
                  }}
                  href="https://fss.ucu.edu.ua/ua/"
                  target="_blank"
                >
                  Faculty of Social Sciences
                </a>
                <a
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "400",
                  }}
                  href="http://sjc.ucu.edu.ua/"
                  target="_blank"
                >
                  School of Journalism & Communication
                </a>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              [theme.breakpoints.down(850)]: {
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              },
            }}
          >
            <a
              href="https://www.facebook.com/UkrainianCatholicUniversity"
              target="_blank"
            >
              <AiOutlineFacebook size={30} color="white" />
            </a>
            <a
              href="https://instagram.com/ucu_official?utm_medium=copy_link"
              target="_blank"
            >
              <AiOutlineInstagram size={30} color="white" />
            </a>
            <a href="https://twitter.com/ucu_university/" target="_blank">
              <AiOutlineTwitter size={30} color="white" />
            </a>
            <a
              href="https://www.linkedin.com/school/ukrainian-catholic-university/"
              target="_blank"
            >
              <AiOutlineLinkedin size={30} color="white" />
            </a>
          </Box>
        </Box>
        <Typography color="white" sx={{ marginTop: "25px" }}>
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
          Developed by <b>Bohdan Mykhailiv</b> and <b>Roman Kulyk</b>
        </Typography>
        <Typography color="white">
          All rights reserved © 2022 Ukrainian Catholic University
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
