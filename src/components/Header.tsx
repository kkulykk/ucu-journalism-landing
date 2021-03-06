import { ThemeProvider } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "../utils/theme";
import "./Header.css";

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="header">
        <Link
          className="header-title"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            color: "white",
            textDecoration: "none",
            fontSize: "1.3rem",
            fontWeight: 600,
            transition: "all ease-in-out 0.5s",
          }}
          to="/"
        >
          UKRAINE. VICTORY CHRONICLES
          <Typography variant="body2">УКРАЇНА. ХРОНІКИ ПЕРЕМОГИ</Typography>
        </Link>
        <Button
          disableElevation
          variant="contained"
          color="info"
          target="_blank"
          href="https://warinua.ucu.edu.ua/donate/"
        >
          Support
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default Header;
