import "./Conversations.css"
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "../Chat/Chat";
import axios from "axios";
const socket = io.connect("http://localhost:3001");

function Conversation({userId}) {
  //create a state for conversations so far by the user

  const[userConvos, setUserConvos]=useState(null)
  const [roomData, setRoomData] = useState(null)
  const [showChat, setShowChat] = useState(false)


  useEffect(()=>{
    console.log('component did mount')

    if (userId) {
    axios.get(`http://localhost:3001/conversationRoutes/userConversations/${userId}`)
    .then((response)=>{
      setUserConvos(response.data)
    })}

  },[userId])



  return (
    <div className="conversation">
      {!showChat ? (
        <div>
           {userConvos ? (userConvos.userData.map((convo, index) => (
              <button key={index} onClick={() => {
                let roomObject = {
                  room: convo.roomconvo,
                  senderId: userId,
                  receiverId: convo.senderid === userId ? convo.receiverid : convo.senderid
                  }

                  socket.emit("join_room", convo.roomconvo)
                  setShowChat(true)
                  setRoomData(roomObject)

              }}>Room with Sender {convo.senderid} and Receiver {convo.receiverid} and roomID {convo.roomconvo}
            </button>
            ))): ""} 
        
          </div>
      ) : (
        <Chat socket={socket} room={roomData.room} senderId={roomData.senderId} receiverId={roomData.receiverId}/>
      )}
    </div>
  );
}

export default Conversation;