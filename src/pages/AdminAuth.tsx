import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import theme from "../utils/theme";

const AdminAuth = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const hangleLoginInput = (event: {
    target: { value: SetStateAction<string> };
  }): void => {
    setLogin(event.target.value);
  };

  const hanglePasswordInput = (event: {
    target: { value: SetStateAction<string> };
  }): void => {
    setPassword(event.target.value);
  };

  const handleLogin = (login: string, password: string): void => {
    if (login != "" && password != "") {
      setError("");
      console.log(login);
      console.log(password);
      localStorage.setItem("adminId", login + password);
      navigate("/adminPanel");
    } else {
      setError("error");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("adminId")) {
      navigate("/adminPanel");
    } else {
      setVisible(true);
    }
  }, []);

  if (!visible)
    return (
      <ThemeProvider theme={theme}>
        <CircularProgress />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: 300 },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
          autoComplete="off"
        >
          <Typography variant="h3" sx={{ textAlign: "left", paddingLeft: 3 }}>
            Log In
          </Typography>
          <TextField
            label="Login"
            variant="outlined"
            onChange={hangleLoginInput}
          />
          <TextField
            error={error != ""}
            helperText={error ? "Incorrect login or password" : ""}
            autoComplete="current-password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={hanglePasswordInput}
          />
          <Button
            onClick={() => handleLogin(login, password)}
            variant="contained"
            sx={{ height: 50 }}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminAuth;
