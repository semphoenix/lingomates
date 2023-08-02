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
  

  
export default function Navbar({userId, handleLogout}){
    const classes = useStyles();

    const getUserProfile = () =>{
        console.log("inside getUserProfile")
        window.location.href  = `/userProfile/${userId}`;
    }

    
    return(

        <>       
            <AppBar className={classes.header} position="static">
                <Toolbar style={{backgroundColor:"brown", minHeight: 120}} >
                    <Grid container spacing={10}>
                        

                            {/* <Grid item xs={3}>
                                <Link to="/home">
                                    <Button variant="outlined" style={{ color: 'black', borderColor:'white'}}>Logo</Button>
                                </Link>
                            </Grid> */}
                                
                            <Grid item xs={2} style={{margin:'auto', borderWidth:5}}>
                                <Link to="/community">
                                    <Button size='large' style={{ color: 'white', borderColor:'white'}}>Logo</Button>
                                </Link> 
                            </Grid>
                                

                            <Grid item xs={2} style={{margin:'auto'}}>
                                <Link to="/conversations">
                                    <Button size='large' style={{ color: 'white'}}>Conversations</Button>
                                </Link>
                            </Grid>
                                
                            <Grid item xs={1} style={{margin:'auto'}}>
                                <Link to="/feed">
                                    <Button size='large' style={{ color: 'white'}}>Feed</Button>
                                </Link>
                            </Grid>

                             <Grid item xs={2} style={{margin:'auto'}}> 
                                <Button size='large' style={{ color: 'white'}} onClick={handleLogout}>Log Out</Button>  
                            </Grid>


                            <Grid item xs={2}>
                            <IconButton
                            size="large"
                            edge="start"
                            // color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2}}
                            style={{color: 'white'}}
                            onClick={getUserProfile}
                            >
                                <AccountCircleIcon style={{fontSize:'4rem'}}/>
                            </IconButton>  
                        
                        </Grid >
                                
                    </Grid>
                </Toolbar>
            </AppBar>

        </>
        
    )
}