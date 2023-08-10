import "./Conversations.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "../Chat/Chat";
import axios from "axios";
import chatImage from "../../../public/assets/let_s-chat-pic_720.png";

const socket = io.connect("https://lingomatesbackend.onrender.com");
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  CardActions,
} from "@mui/material";

import Navbar from "../Navbar/Navbar";

function Conversation({ userId, handleLogout, loggedIn }) {
  //create a state for conversations so far by the user

  const [userConvos, setUserConvos] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [receiverData, setReceiverData] = useState([]);

  useEffect(() => {
    //fetch all the chats
    if (userId) {
      axios
        .get(
          `https://lingomatesbackend.onrender.com/conversationRoutes/userConversations/${userId}`
        )
        .then((response) => {
          console.log(response.data);
          setUserConvos(response.data);
        });
    }
  }, [userId]);

  return (
    <>
      {!loggedIn ? (
        <div>
          <div>
            <Navbar
              userId={userId}
              handleLogout={handleLogout}
              loggedIn={loggedIn}
            />
          </div>
          <h1 className="please-login-header">
            Please log in to see this page
          </h1>
          </div>
      ) : (
        <div className="conversations-page">
          <div className="navbar-convo">
            <Navbar id="navID" userId={userId} handleLogout={handleLogout} loggedIn={loggedIn} />
          </div>
          <div className="convo-chat">
            <div className="conversation">
              <div className="rooms">
                {userConvos
                  ? userConvos.userData.map((convo, index) => (
                      <button
                        className="custom-button"
                        key={index}
                        onClick={() => {
                          let roomObject = {
                            room: convo.roomconvo,
                            senderId: userId,
                            receiverId:
                              convo.senderid === userId
                                ? convo.receiverid
                                : convo.senderid,
                          };

                          socket.emit("join_room", convo.roomconvo);
                          setReceiverData(convo.otherProfile);
                          setShowChat(true);
                          setRoomData(roomObject);
                        }}
                      >
                        <span className="avatar-container">
                          <Avatar
                            alt={convo.otherProfile.username}
                            src={convo.otherProfile.profilepicture}
                            sx={{ margin: "auto", width: 90, height: 90 }}
                          />
                        </span>{" "}
                        {convo.otherProfile.first_name}{" "}
                        {convo.otherProfile.last_name}{" "}
                      </button>
                    ))
                  : ""}
              </div>
            </div>
            <div className="chat-section">
              {!showChat ? (
                <div className="no-chat-selected">
                  <h1>Select Your Lingomate </h1>
                  <img
                    src={chatImage}
                    alt="This is the image of Fitness logo"
                  />
                </div>
              ) : (
                <div>
                   <Chat
                    key={roomData ? roomData.room : null}
                    socket={socket}
                    room={roomData.room}
                    senderId={userId}
                    receiverId={roomData.receiverId}
                    receiverData={receiverData}
                  /> 
                </div>
              )} 
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Conversation;
