import React from "react";
import "./Community.css";
import "../Chat/Chat.css";

import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import Chat from "../Chat/Chat";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Viewprofile from "../Viewprofile/Viewprofile";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function Community({
  loggedIn,
  userId,
  dailyLanguages,
  setDailyLanguages,
  setSelectedDailyLanguage,
  userData,
  handleLogout,
}) {
 
  const [recommendedUsers, setRecommendedUsers] = useState(null);
  const [allUsers, setAllUsers] = useState([])
  const [searchUsername, setSearchUsername] = useState("");
  const [loadNumber, setLoadNumber] = useState(1);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [chatView, setChatView] = useState(false);
  const [roomToJoin, setRoomToJoin] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  //console.log("userId value in community: ", userId);
  // console.log("test datas data in community: ", testData)

  const searchForm = async (event) => {
    event.preventDefault();
    //console.log("inside searchForm");

    try{
      const response = await axios.get(
        `http://localhost:3001/community/viewUser/${searchUsername}`
      );
      
      if(response.status === 200){
        const searchValue = response.data.userInfo.id;
        setSearchUsername("")
        window.location.href = `/userProfile/${searchValue}`;
      }
    }catch(err){
        console.log("error: ", err.response.data.message)
        alert(err.response.data.message)
    }
    const response = await axios.get(
      `http://localhost:3001/community/viewUser/${searchUsername}`
    );

  };

  useEffect(() => {
    // if current user id exists then do an  axios call that returns current user selected languages
    if (userId) {
      try {
        axios.get(`http://localhost:3001/community/linguas/${userId}`).then((languages) => {
            setDailyLanguages(languages.data.lingasData);
          });


      } catch {
        (error) => {
          console.log(error);
        };
      }
    }
  }, [userId]);

  const loadMoreUsers = () => {
    let newNum = loadNumber + 1;
    setDisplayedUsers(recommendedUsers.slice(0, newNum * 3));
    setLoadNumber(newNum);
  };

  const handleSelectOnChange = async (event) => {
    const languageId = event.target.value;
    console.log(`the language value is ${languageId}`)

    if (languageId !== "Select a language") {
      axios
        .get(
          `http://localhost:3001/community/recommended/${userId}/${languageId}`
        )
        .then((recUsers) => {
          //console.log("recommended users: ", recUsers.data.users);
          setRecommendedUsers(recUsers.data.users);
          setSelectedDailyLanguage(languageId);
          setDisplayedUsers(recUsers.data.users.slice(0, loadNumber * 3));

          // once user changes to different language for recommended users need to reset the load number and display only the inital
          //deisred value of users
          if (loadNumber > 1) {
            setLoadNumber(1);
            setDisplayedUsers(recUsers.data.users.slice(0, 3));
          }
        });
    }
  };

  const handleSendMessage = (chosenUser) => {
    //console.log("chosen user is", chosenUser);
    axios
      .get(`http://localhost:3001/conversationRoutes/${chosenUser}`)
      .then((response) => {
        setSelectedProfile(response.data.userData[0]);
        //console.log("The selected profile is" , response.data.userData[0])
       
      });

    setSelectedUserId(chosenUser);
    axios
      .post("http://localhost:3001/conversationRoutes/communityJoinRoom", {
        userId,
        chosenUser,
      })
      .then((res) => {
        setRoomToJoin(res.data);
        socket.emit("join_room", roomToJoin);
        // window.location.href = `/chats`
        setChatView(true);
      });
  };

    //   console.log("userData: ", userData);
    //   console.log("userData first name: ", userData.first_name);
    //   console.log("searched username: ", searchUsername);
    //   console.log("current users' selected language: ", dailyLanguages);
    //   console.log("display users: ", displayedUsers);
    console.log("whats in recommended users: ", recommendedUsers)
    console.log("logged in value: ", loggedIn)
    console.log("value fo chatView:", chatView)
    return (
    
    <div className="communityPage">
      {/* <div className="communityNavbar">
        <Navbar userId={userId} handleLogout={handleLogout} />
      </div> */}
      
      {!loggedIn? (<h1 className="please-login-header">Please log in to see this page</h1>) : (

        <>
             {!chatView? (

        <>   
          <div className="communityNavbar">
            <Navbar userId={userId} handleLogout={handleLogout} />
          </div>
      
        <div className="communityView">
          <div className="recommended-container">
            <div className="welcome"> Welcome {userData.first_name}</div>

              <form onSubmit={searchForm} className="search-form">
                <input
                  className="search-input"
                  type="text"
                  name="search"
                  placeholder="Search Users"
                  onChange={(event) => setSearchUsername(event.target.value)}
                />
              </form>
             
              <div className="select-lang">
                <label className="selected-lang-text">Click on Language to Show Recommended Users</label>
                <div>
                {dailyLanguages?.map((language) => {
                    let imageName = `${language.linguaname.toLowerCase()}`
                    let imageSrc = `../../src/assets/${imageName}.png`
                    return <button className="btn-flag-image" 
                        style={{backgroundImage: `url(${imageSrc})` }} 
                        value={language.linguaid} 
                        onClick={handleSelectOnChange} 
                        key={language.linguaname}  
                        alt={language.linguaname}>{language.linguaname}</button>
                }
                    
                  )}                   
                </div>
              </div>

            {recommendedUsers && (
              <div className="recommendedUsers-contianer">
                <div className="recommended-word"> Recommended Users </div>

                {displayedUsers?.map((recUsers, index) => {
            
                  return (
                    <div className="cardContaineer" key={index}>
                      <Grid>
                        <Grid item>
                          {/* #001427 */}
                          <Card sx={{ minWidth: 250, maxWidth:250, minHeight: 300, maxHeight:300, backgroundColor:"#001427"}}>
                            <CardContent>
                              <Avatar
                                alt={recUsers.username}
                                src={recUsers.profilepicture}
                                sx={{ margin: "auto", width: 80, height: 80 }}
                              />

                                <Typography
                                  sx={{ color:"white", fontSize:28, paddingTop: 3}}
                                  align="center"
                                >
                                  {recUsers.username}
                                </Typography>

                              <CardActions
                                style={{
                                  justifyContent: "center",
                                  padding: 0,
                                  paddingTop: 20
                                }}
                              >
                                <Button
                                  onClick={() => handleSendMessage(recUsers.id)}
                                  variant="contained"
                                  size="large"
                               
                                >
                                  Message
                                </Button>

                                <br />
                              </CardActions>

                              <br />
                              <CardActions
                                style={{
                                  justifyContent: "center",
                                  padding: 0,
                                }}
                              >
                                <Link to={"/userProfile/" + recUsers.id} style={{fontSize: 24, paddingTop:15, textDecorationLine:"none"}} className="view-profile-link">
                                  View Profile
                                </Link>
                              </CardActions>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}

                <br />

                <Grid container style={{ justifyContent: "center" }}>
                  <Grid item style={{ display: "inline-block" }}>
                    <Button variant="outlined" size="large" onClick={loadMoreUsers} style={{margin: "auto"}}>
                      Load More
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        </div>
        </>
      ) : (
        <>
        <div className="toggle-community-chat">
            <Button variant="outlined" onClick={()=>setChatView(false)} style={{color:"brown", fontSize:18, borderColor: "brown"}} size="small">X</Button>
        </div>
        
        <div>
          <Chat
            socket={socket}
            room={roomToJoin.room.roomconvo}
            senderId={userId}
            receiverId={selectedUserId}
            receiverData={selectedProfile}
          />
        </div>
        </>
      )}
        </>
      )}
    </div>
  );
}
