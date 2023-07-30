import "./Login.css";
import Landing from "../Landing/Landing";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode"
import axios from "axios"

export default function Login({setUserId, setLoggedIn, setLoginError, userId}) {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handleLogin
  const handleLogin = async (email, password) => {
    console.log("Before call")
    let response = await axios.post("http://localhost:3001/auth/login", {
      email,
      password,
    });
    
    console.log("after response")
    console.log("What's in response: ", response)

    if(response.status === 200){
      setLoggedIn(true)
      setLoginError("") 

      const {token} = response.data
      localStorage.setItem("token", token); //adds token to localStorage by creating a "dictionary" where "token" = key and token = value
      const decodedToken = jwtDecode(token) //decodes token to human readable informtation where payload/data in token can be accessed

      console.log("decodedToken info: ", decodedToken)
      setUserId(decodedToken.userId)  
      
      
      window.location.href = "/community"
    }else{
      console.log("error cought")
      console.log(response.data.message); //optional - display error message
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  
  return (
    <div className="login">
      <Link to="/">
        <img className="logo" src="src/assets/snail.png" />
      </Link>
      <h2 className="greeting">Welcome</h2>
      <form onSubmit={handleSubmit}>
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
          name="password"
          type="password"
          placeholder="Password"
          className="password-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <div className="css-0">
        New to us?{" "}
        <a className="chakra-link css-c6nly4" href="/register">
          Sign Up
        </a>
      </div>
    </div>
  );
}
