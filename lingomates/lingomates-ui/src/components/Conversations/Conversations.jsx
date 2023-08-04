import "./Conversations.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "../Chat/Chat";
import axios from "axios";
const socket = io.connect("http://localhost:3001");

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
    <div>
      <Navbar userId={userId} handleLogout={handleLogout} />
      <div className="convo-chat">
        <div className="conversation">
          <div className="rooms">
            {userConvos
              ? userConvos.userData.map((convo, index) => (
                  <button
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
                    Room with {convo.otherProfile.first_name} 
                  </button>
                ))
              : ""}
          </div>
        </div>
        <div className="chat-section">
          {!showChat ? (
            <h1>please select a chat</h1>
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
