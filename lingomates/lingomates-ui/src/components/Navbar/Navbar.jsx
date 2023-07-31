import React from "react"
import {Link} from "react-router-dom"
import {AppBar, Box, Toolbar, Typography, Button, Grid, Container, IconButton} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import {orange,lime} from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeStyles } from "@mui/styles";
import "./Navbar.css"



{/* style={{ color: 'black', backgroundColor: 'white'}} variant="contained" */}
// const theme = createTheme({
//     palette:{
//         primary: orange,
//         secondary: lime,
//     },
// });

const background = "https://media.istockphoto.com/id/1362607569/vector/watercolor-cute-art-background-in-nude-or-powder-colour.jpg?s=612x612&w=0&k=20&c=JIlFLWImCjR5s-TtPxaBIjsk_5P0nocFpSR7-GblX7w=";

const useStyles = makeStyles((theme) => ({
    header: {
      backgroundImage: `url(${background})`,
    },
  }));

  
  
export default function Navbar({userId}){
    const classes = useStyles();

    const getUserProfile = () =>{
        console.log("inside getUserProfile")
        window.location.href  = `/userProfile/${userId}`;
    }

    
    return(

        <>       
            <AppBar className={classes.header} position="static">
                <Toolbar style={{backgroundColor:`url(${background})`, minHeight: 120}} >
                    <Grid container spacing={10}>
                        <Grid item xs={2}>
                            <IconButton
                            size="large"
                            edge="start"
                            // color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2}}
                            style={{color: 'black'}}
                            onClick={getUserProfile}
                            >
                                <AccountCircleIcon style={{fontSize:'4rem'}}/>
                            </IconButton>  
                        
                        </Grid >

                            {/* <Grid item xs={3}>
                                <Link to="/home">
                                    <Button variant="outlined" style={{ color: 'black', borderColor:'white'}}>Logo</Button>
                                </Link>
                            </Grid> */}
                                
                            <Grid item xs={3} style={{margin:'auto', borderWidth:5}}>
                                <Link to="/community">
                                    <Button variant="outlined" size='large' style={{ color: 'black', borderColor:'black'}}>Community</Button>
                                </Link> 
                            </Grid>
                                
                            <Grid item xs={3} style={{margin:'auto'}}>
                                <Link to="/chats">
                                    <Button variant="outlined" size='large' style={{ color: 'black', borderColor:'black'}}>Conversations</Button>
                                </Link>
                            </Grid>
                                
                            <Grid item xs={3} style={{margin:'auto'}}>
                                <Link to="/feed">
                                    <Button variant="outlined" size='large' style={{ color: 'black', borderColor:'black'}}>Feed</Button>
                                </Link>
                            </Grid>
                                
                    </Grid>
                </Toolbar>
            </AppBar>

        </>
        
    )
}