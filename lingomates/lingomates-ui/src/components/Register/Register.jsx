import "./Register.css";
import Landing from "../Landing/Landing";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  //states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  //handleRegister

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(email, password, firstName, lastName, username);
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
          name="password"
          type="password"
          placeholder="Password"
          className="password-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
