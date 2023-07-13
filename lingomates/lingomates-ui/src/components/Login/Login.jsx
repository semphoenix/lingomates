import "./Login.css";
import Landing from "../Landing/Landing";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ userId, setUserId, loggedIn, setLoggedIn }) {
  //states
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  //handleLogin
  const handleLogin = async (emailLogin, passwordLogin) => {
    let response = await axios.post("http://localhost:3001/auth/login", {
      emailLogin,
      passwordLogin,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(emailLogin, passwordLogin);
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
          value={emailLogin}
          onChange={(e) => setEmailLogin(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="password-field"
          value={passwordLogin}
          onChange={(e) => setPasswordLogin(e.target.value)}
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
