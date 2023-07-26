import "./Conversations.css"
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "../Chat/Chat";
import axios from "axios";
const socket = io.connect("http://localhost:3001");

function Conversation({userId}) {
  //create a state for conversations so far by the user

  const[userConvos, setUserConvos]=useState(null)
  
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  useEffect(()=>{

    if(userId){
    axios.get(`http://localhost:3001/conversationRoutes/userConversations/${userId}`)
    .then((response)=>{
      setUserConvos(response.data)
    })}

  },[userId])

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  console.log("userConvos: ");
  console.log(userConvos);


  return (
    <div className="conversation">
      {/* {userConvos ? (userConvos.userData.map((convo, index) => (
            <button key={index} onClick={() => 
            setRoom(convo.roomconvo)
             }>Room with {convo.receiverd}
            
            </button>))): ""} */}      
      {userConvos ? (userConvos.userData.map((convo, index) => (
         <h1>{convo.roomconvo}</h1>   
            
            ))): ""}      
      <h2></h2>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>

          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Conversation;