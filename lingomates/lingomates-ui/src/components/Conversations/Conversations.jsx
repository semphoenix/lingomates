import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function Conversations({ userId }) {
  //message state
  const [messageSent, setMessageSent] = useState("");
  const [messageReceived,setMessageReceived]=useState("")
  //room state
  const [room, setRoom]=useState("")
  
  //function callled when join toom button is clicked
  const joinRoom=()=>{
    if (room!==""){
      socket.emit("join_room", room);
    }
  }

  const sendMessage = () => {
    socket.emit(
      "send_message",//this only emits data to the backend and the backend will emit that event to the front end using another event we listening to in the front end
      {messageSent, room}
    );
    console.log("room is", room)
    console.log("and message is", messageSent)
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
      console.log("message", messageReceived)
    });
  }, [socket]);
  return (
    <div>
      <h3>Join a chat</h3>
   </div>
  );
}

export default Conversations;
