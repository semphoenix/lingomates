import "./Register.css";
import Landing from "../Landing/Landing";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import jwtDecode from "jwt-decode"
import Header from "../Header/Header";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from '@mui/material/MenuItem';

export default function Register({setUserId, setLoggedIn}) {
  //states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");

  //handleRegistation
  const  handleRegistration = async (email, password, firstName, lastName, username, profilePicture, nativeLanguage) =>{

      let response = await axios.post("http://localhost:3001/auth/register",{email, password, firstName, lastName, username, profilePicture, nativeLanguage})

      if(response.status === 201){
        const {token} = response.data
        localStorage.setItem("token", token)
        const decodedToken = jwtDecode(token)
        setUserId(decodedToken.userId);

        //Registration successful!
        setLoggedIn(true);
        window.location.href = "/langprompt"

      }else{
        console.log(response.data.message); //optional - display error message
      }
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(email, password, firstName, lastName, username, profilePicture, nativeLanguage);
    console.log("firstName value: ", firstName);
  };

  return (
    <div className="login">
      <Header/>
      <form onSubmit={handleSubmit}>
      {/* <ThemeProvider theme={defaultTheme}> */}
      <Container component="main" maxWidth="">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            🙈
          </Typography>
          <Typography component="h1" variant="h5" fontWeight={"bold"} fontFamily={"Nunito"}>
            Sign up
          </Typography>
          <Typography component="p" variant="p">
            Don't wait any longer. Start your language learning journey today!
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="confirm-password"
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="profilepicture"
                  label="Profile Picture URL"
                  // type="password"
                  id="profilepicture"
                  autoComplete="profile"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Enter a short description about yourself"
                  id="profilepicture"
                  autoComplete="profile"
                />
              </Grid>
              <Grid item xs={12}>
      <InputLabel id="demo-simple-select-label">What is your native language?</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={nativeLanguage}
        label="Native Language"
        fullWidth
        onChange={(event) => setNativeLanguage(event.target.value)}
      >
        <MenuItem value="">What is your native language?</MenuItem>
        <MenuItem value="English">English</MenuItem>
        <MenuItem value="Spanish">Spanish</MenuItem>
        <MenuItem value="Portuguese">Portuguese</MenuItem>
        <MenuItem value="Swedish">Swedish</MenuItem>
        <MenuItem value="French">French</MenuItem>
        <MenuItem value="Italian">Italian</MenuItem>
        <MenuItem value="German">German</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I accept the terms and conditions"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontWeight: "bold", background: "brown"}}
              onClick={handleSubmit}
            >Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    {/* </ThemeProvider> */}
      </form>
      </div>
  );
}
