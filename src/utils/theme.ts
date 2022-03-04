import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "light",
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
    fontFamily: '"Fira Sans"',
  },
});
export default theme;
