import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Grid,
  Container,
  IconButton,
  Avatar,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { orange, lime } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { Slide } from "react-awesome-reveal";
import { useState, useEffect } from "react";
import "./Navbar.css";

const background =
  "https://media.istockphoto.com/id/1362607569/vector/watercolor-cute-art-background-in-nude-or-powder-colour.jpg?s=612x612&w=0&k=20&c=JIlFLWImCjR5s-TtPxaBIjsk_5P0nocFpSR7-GblX7w=";

const useStyles = makeStyles((theme) => ({}));

export default function Navbar({ userId, handleLogout, loggedIn }) {
  const classes = useStyles();

  const getUserProfile = () => {
    console.log("inside getUserProfile");
    window.location.href = `/userProfile/${userId}`;
  };

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`https://lingomates-backend-copy.onrender.com/profile/${userId}`)
        .then((response) => {
          setCurrentUser(response.data.userData[0]);
          console.log(response.data);
        });
    }
  }, [userId, loggedIn]);

  return (
    <div className="navbar">
      <header className="header w-full h-auto bg-transparent overflow-x-hidden fixed z-50 top-0 left-0">
        <nav
          className={`w-full md:h-24 h-20 bg-red lg:px-24 md:px-12 px-8 flex justify-between items-center`}
        >
          <Link to="/community" className="link-button logo-button">
            <h1 className="poppin">
              Lingo<span className="matesHead">mates</span>
            </h1>
          </Link>
          <div className="nav-links flex flex-grow">
            <ul className="flex">
              <Link to="/community" className="link-button">
                <li className="w-full">
                  <button type="button" className="communuity">
                    Community
                  </button>
                </li>
              </Link>
              <Link to="/conversations" className="link-button">
                <li className="w-full">
                  <button type="button" className="convo">
                    Conversations
                  </button>
                </li>
              </Link>
              <Link to="/feed" className="link-button">
                <li className="w-full">
                  <button type="button" className="feed">
                    News
                  </button>
                </li>
              </Link>
              {loggedIn && (
                <>
                  <Avatar
                    src={currentUser.profilepicture}
                    onClick={getUserProfile}
                    sx={{
                      width: 50,
                      height: 50,
                      marginLeft: 80,
                      marginRight: -10,
                      cursor: "pointer",
                    }}
                  />
                  <li onClick={getUserProfile} className="first-name">
                    {currentUser.first_name}
                  </li>
                  <li onClick={handleLogout} className="w-full-border">
                    <button
                      type="button"
                      className="loggout"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </li>
                </>
              )}
              {!loggedIn && (
                <>
                  <Link to="/login" className="link-button">
                    <li className="w-full">
                      <button type="button" className="signin">
                        Sign In
                      </button>
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}
