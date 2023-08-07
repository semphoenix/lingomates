import "./Conversations.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "../Chat/Chat";
import axios from "axios";
import chatImage from "/Users/mkebede/capstone/Lingomates/lingomates/lingomates-ui/src/components/Conversations/Let's-chat-pic.png"

const socket = io.connect("http://localhost:3001");
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

function Conversation({ userId, handleLogout }) {
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
          `http://localhost:3001/conversationRoutes/userConversations/${userId}`
        )
        .then((response) => {
          console.log(response.data);
          setUserConvos(response.data);
        });
    }
  }, [userId]);

  return (
    <div className="conversations-page">
      <div className="navbar-convo">
      <Navbar id="navID" userId={userId} handleLogout={handleLogout} />
      </div>
      <div className="convo-chat">
        <div className="conversation">

          <div className="rooms">
            {userConvos
              ? userConvos.userData.map((convo, index) => (
                  <button className="custom-button"
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
                      setReceiverData(convo.otherProfile)
                      setShowChat(true);
                      setRoomData(roomObject);
                    }}
                  >
                    <span className="avatar-container">
                     <Avatar
        alt={convo.otherProfile.username}
        src={ convo.otherProfile.profilepicture}
        sx={{ margin: "auto", width: 90, height: 90 }}
         />
         </span> {convo.otherProfile.first_name} {" "}{convo.otherProfile.last_name} </button>
                ))
              : ""}
          </div>
        </div>
        <div className="chat-section">
          {!showChat ? (
            <div className="no-chat-selected">
          
            <h1>Select Your Lingomate </h1>
            <img src={chatImage} alt="This is the image of Fitness logo" />
            </div>
    
          ) : (
            <div>
              <Chat
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
  );
}

export default Conversation;
