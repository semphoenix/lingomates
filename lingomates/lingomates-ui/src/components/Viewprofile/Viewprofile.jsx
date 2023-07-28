import React from 'react';
import "./Viewprofile.css";
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from "axios";
import {Card, CardContent, Typography, CardMedia, Avatar, Grid, Button, CardActions} from '@mui/material';
import {Link} from "react-router-dom"
export default function Viewprofile() {

  const [selectedUser, setSelectedUser] = useState({})
  const [selectedUserLangs,setSelectedUserLangs] = useState([])

  const usersId = useParams()
  // console.log("what is usersId: ", usersId.id)
  useEffect(()=>{

    axios.get(`http://localhost:3001/profile/${usersId.id}`).then((response)=>{
      // console.log("selected user info: ", response.data.userData[0])
      setSelectedUser(response.data.userData[0])
    })

    axios.get(`http://localhost:3001/community/linguas/${usersId.id}`).then((response)=>{
      // console.log("selected users languages: ", response.data.lingasData)
      setSelectedUserLangs(response.data.lingasData)
    })

  },[])

   console.log("selectedUser set to: ", selectedUser)
   console.log("selectedUser langas:",  selectedUserLangs)
  return (
    <>
      {/*  paddingTop:10-use for avatar/  margin:'auto' */}
      {/* sx={{maxWidth:600, minHeight: 600}} */}
      <Grid container justifyContent="center" alignItems="center" sx={{minHeight:"100vh"}}>
          <Grid item sx={{width: 450}}>
              <Card sx={{minHeight: 600}}>
                  <CardMedia 
                    sx={{ height: 180 }}
                    image={selectedUser.profilepicture}
                  />

          {/* <Avatar 
              alt={selectedUser.username} 
              src={selectedUser.profilepicture} 
              sx={{margin:'auto', width: 160, height: 160}}/> */}

                <CardContent>
                    <Typography align="center" sx={{paddingTop:2, fontSize:'2.5rem'}}>{selectedUser.first_name}<span className="last-name">{selectedUser.last_name}</span></Typography>

                    {selectedUserLangs?.map((selectedLangs)=>{
                        return(<Typography align="center" sx={{paddingTop:2, fontSize:'1.5rem'}}>{selectedLangs.linguaname}<span className="last-name">{selectedLangs.proficiencylevel}</span></Typography>)
                    })}
                    
                    <CardActions style={{justifyContent: 'center', paddingTop:60}}>
                        <Link to="/conversations">
                          <Button variant="outlined" size="medium">Message</Button>
                        </Link>
                    </CardActions>
                    
                </CardContent>
              </Card>
          </Grid>
      </Grid>
    </>
    
  )
}

