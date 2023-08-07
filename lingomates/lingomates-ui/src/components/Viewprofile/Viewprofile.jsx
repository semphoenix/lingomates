import React from 'react';
import "./Viewprofile.css";
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from "axios";
import {Card, CardContent, Typography, CardMedia, Avatar, Grid, Button, CardActions} from '@mui/material';
import {Link} from "react-router-dom"
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001")
import Chat from "../Chat/Chat";
import Navbar from '../Navbar/Navbar';

export default function Viewprofile({userId}) {

  const [selectedUser, setSelectedUser] = useState({})
  const [selectedUserLangs,setSelectedUserLangs] = useState([])
  const [roomToJoin, setRoomToJoin] = useState([]);
  const [viewChat, SetViewChat]=useState(false)

  const chosenUserId = useParams()
  // console.log("what is usersId: ", usersId.id)
  console.log(selectedUser)
  
  useEffect(()=>{

    axios.get(`http://localhost:3001/profile/${chosenUserId.id}`).then((response)=>{
      // console.log("selected user info: ", response.data.userData[0])
      setSelectedUser(response.data.userData[0])
    })

    axios.get(`http://localhost:3001/community/linguas/${chosenUserId.id}`).then((response)=>{
      // console.log("selected users languages: ", response.data.lingasData)
      setSelectedUserLangs(response.data.lingasData)
    })

  },[])

  const handleSendMessage = (chosenUser) => {
    //console.log("chosen user is", chosenUser);
    
    axios
      .post("http://localhost:3001/conversationRoutes/communityJoinRoom", {
        userId,
        chosenUser,
      })
      .then((res) => {
        setRoomToJoin(res.data);
        socket.emit("join_room", roomToJoin);
        SetViewChat(true);
      });
  };


   console.log("selectedUser set to: ", selectedUser)
   console.log("selectedUser langas:",  selectedUserLangs)
   
  return (
    <div className='profileview'>
    <Navbar userId={userId}/>
    {!viewChat ? (
      /*  paddingTop:10-use for avatar/  margin:'auto' */
      /* sx={{maxWidth:600, minHeight: 600}} */
      <Grid container justifyContent="center" alignItems="center" sx={{minHeight:"100vh"}}>
          <Grid item sx={{width: 450}}>
              <Card sx={{minHeight: 600}}>
                  {/* <CardMedia 
                    sx={{ height: 180 }}
                    image={selectedUser.profilepicture}
                  /> */}

          <Avatar 
              alt={selectedUser.username} 
              src={selectedUser.profilepicture} 
              sx={{margin:'auto', width: 160, height: 160}}/>

                <CardContent>
                    <Typography align="center" sx={{paddingTop:2, fontSize:'2.5rem'}}>{selectedUser.first_name}<span className="last-name">{selectedUser.last_name}</span></Typography>
                    <Typography align="center" sx={{paddingTop:2, fontSize:'1.5rem', borderBottom: 1, paddingBottom:"10px"}}>Native Language: {selectedUser.nativelanguage}</Typography>
                    <Typography align="center" sx={{paddingTop:2, fontSize:'1.5rem', borderBottom: 1, paddingBottom:"10px"}}>About Me: {selectedUser.description}</Typography>
                    {selectedUserLangs?.map((selectedLangs)=>{
                        return(<Typography align="center" sx={{paddingTop: 2.5, fontSize:'1.5rem'}}>{selectedLangs.linguaname}<span className="last-name">{selectedLangs.proficiencylevel}</span></Typography>)
                    })}
                    
                    <CardActions style={{justifyContent: 'center', paddingTop:60}}>
                        
                          <Button onClick= {() => handleSendMessage(chosenUserId.id)} variant="outlined" size="medium">Message</Button>
                        
                    </CardActions>
                    
                </CardContent>
              </Card>
          </Grid>
      </Grid>)
      
      :(
        <Chat socket={socket}
        room={roomToJoin.room.roomconvo}
        senderId={userId}
        receiverId={chosenUserId.id}
        receiverData={selectedUser}  />
      )
  }
    </div>
    
  )
}

