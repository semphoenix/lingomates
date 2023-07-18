import "./Register.css";
import Landing from "../Landing/Landing";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import jwtDecode from "jwt-decode"

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
      <Link to="/">
        <img className="logo" src="src/assets/snail.png" />
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          id="field-:r2:"
          required
          aria-required="true"
          className="firstName-field"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last name"
          id="field-:r3:"
          required
          aria-required="true"
          className="lastName-field"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="email-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          required
          className="username-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="password-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          name="passwordConfirm"
          type="password"
          placeholder="Confirm Password"
          required
          className="confirmpassword-field"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <input
          name="profilePicture"
          type="url"
          placeholder="Profile Picture URL"
          required
          className="profilepic-field"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        <select required defaultValue="nativeLangSelect" placeholder='What is your native language?' onChange={(event)=> setNativeLanguage(event.target.value)}>
            <option value="nativeLangSelect" disabled>What is your native language?</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portugese">Portugese</option>
            <option value="swedish">Swedish</option>
            <option value="french">French</option>
            <option value="italian">Italian</option>
            <option value="german">German</option>
        </select>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
      <div className="css-0">
        Have an account?{" "}
        <a className="chakra-link css-c6nly4" href="/login">
          Login
        </a>
      </div>
    </div>
  );
}
