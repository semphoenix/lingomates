import "./Login.css";
import Landing from "../Landing/Landing";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Header from "../Header/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Login({
  setUserId,
  setLoggedIn,
  setLoginError,
  userId,
}) {
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit">Lingomates</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const defaultTheme = createTheme();

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userResponse, setUserResponse] = useState({});
  //handleLogin
  const handleLogin = async (email, password) => {
    console.log("Before call");

    try {
      let response = await axios.post(
        "https://lingomates-backend-copy.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        setLoggedIn(true);
        setLoginError("");

        const { token } = response.data;
        localStorage.setItem("token", token); //adds token to localStorage by creating a "dictionary" where "token" = key and token = value
        const decodedToken = jwtDecode(token); //decodes token to human readable informtation where payload/data in token can be accessed

        console.log("decodedToken info: ", decodedToken);
        setUserId(decodedToken.userId);

        window.location.href = "/community";
      }
    } catch (error) {
      console.log("error:", error);
      return alert(error.response.data.error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="login">
      <ThemeProvider theme={defaultTheme}>
        <Header />
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://img.myloview.com/posters/young-happy-people-laughing-together-multiracial-friends-group-having-fun-on-city-street-diverse-culture-students-portrait-celebrating-outside-friendship-community-youth-university-concept-700-268008224.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={80}
            md={5}
            component={Paper}
            elevation={8}
            square
            style={{}}
          >
            <Box
              sx={{
                my: 30,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: 'red' }}> */}
              <Typography
                component="h1"
                variant="h5"
                fontFamily={"Nunito"}
                fontWeight={"bold"}
              ></Typography>
              {/* </Avatar> */}
              <Typography
                component="h1"
                variant="h5"
                fontFamily={"Nunito"}
                fontWeight={"bold"}
                style={{ color: "" }}
              >
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: "",
                    borderStyle: "solid",
                    borderRadius: 5,
                    borderColor: "white",
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    backgroundColor: "",
                    borderStyle: "solid",
                    borderRadius: 5,
                    borderColor: "white",
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontWeight: "bold", background: "brown" }}
                >
                  Sign In
                </Button>

                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
