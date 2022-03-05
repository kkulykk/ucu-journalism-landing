import { createTheme, ThemeProvider } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#7f1716",
    },
    secondary: {
      main: "#424141",
    },
    info: {
      main: "#ffffff",
      contrastText: "#7f1716",
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: "Fira Sans",
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      marginBottom: "10",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h4: {
      fontWeight: 400,
      fontSize: "1.2rem",
    },
    h5: {
      fontWeight: 300,
      fontStyle: "italic",
      fontSize: "1.2rem",
    },

    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
    },
  },
});

export default theme;
