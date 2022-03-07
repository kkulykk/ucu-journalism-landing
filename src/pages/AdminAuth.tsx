import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../utils/firebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import theme from "../utils/theme";

const AdminAuth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const [warning, setWarning] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setWarning(true);
    }
  };

  const Loader = () => {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/adminPanel");
  }, [user, loading]);

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
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            error={warning}
            helperText={warning ? "Incorrect email or password" : ""}
            autoComplete="current-password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            onClick={() => login(email, password)}
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
