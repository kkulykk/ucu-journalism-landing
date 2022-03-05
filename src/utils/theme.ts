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
      main: "#607d8b",
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
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
    },
  },
});

export default theme;
