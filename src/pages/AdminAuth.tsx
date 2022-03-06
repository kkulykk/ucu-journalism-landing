import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "@firebase/auth";

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
  const [error, setError] = useState<boolean>(false);
  const [user, setUser] = useState<{} | null>(null)

  const login = async (email: string, password: string) => {
    if (email != "" && password != "") {
      setError(false);

      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        navigate("/adminPanel");
      } catch (err) {
        setError(true);
        console.error(err)
      }

    } else {
      setError(true);
    }
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/adminPanel")
    }
  }, [user])

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
            error={error}
            helperText={error ? "Incorrect email or password" : ""}
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
