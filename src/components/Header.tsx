import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import theme from "../utils/theme";
import "./Header.css";

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="header">
        <a
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "1.3rem",
            fontWeight: 600,
          }}
          href="/"
        >
          Victory chronicles
        </a>
        <Button
          disableElevation
          variant="contained"
          color="info"
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
