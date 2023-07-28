import React from "react";
import "./Community.css";
import Navbar from "../Navbar/Navbar";
import {useState, useEffect} from "react";
import axios from "axios";
import {Card, CardContent, Typography, Avatar, Grid, Button, CardActions}from '@mui/material';
import {Link} from "react-router-dom"
export default function Community({loggedIn, userId, dailyLanguages, setDailyLanguages, setSelectedDailyLanguage}){

    const [userData, setUserData] = useState({})
    const [recommendedUsers, setRecommendedUsers] = useState(null)
    const [searchUsername, setSearchUsername] = useState("")

    console.log("userId value in community: ", userId)

     const searchForm = (event) =>{
        event.preventDefault()
        console.log("inside searchForm")
     }


    useEffect(()=>{

        // if current user id exists then 2 axios calls that returns current user data and user selected languages
        if(userId){
            try{

                //gets current user that is logged in based on userId-comes from user id from token
                axios.get(`http://localhost:3001/community/${userId}`).then((response)=>{
                    console.log("what is this: ", response.data.userData[0])
                    setUserData(response.data.userData[0])})
                
                axios.get(`http://localhost:3001/community/linguas/${userId}`).then((languages)=>{
                    console.log("what's in user selected language(s): ", languages.data.lingasData)
                     setDailyLanguages(languages.data.lingasData)
                })

            }catch{(error)=>{
                console.log(error);
            }}
        }
    },[userId])


        const handleSelectOnChange = async(event) => {
            const languageId = event.target.value; 
            const response =  await axios.get(`http://localhost:3001/community/recommended/${userId}/${languageId}`).then((recUsers)=>{
                console.log("recommended users: ", recUsers.data.users)
                setRecommendedUsers(recUsers.data.users)
                setSelectedDailyLanguage(languageId)
            })
            // console.log(event.target.value)
        }

      

    //langObj.linguaid
    // console.log("langData: ", languageData)
     console.log("userData: ", userData)
    // console.log("current user id: ", userId)
    // console.log("recommended users: ", recommendedUsers)

    console.log("searched username: ", searchUsername)
    console.log("current users' selected language: ", dailyLanguages)

    return(

        <>
            <div>
                <Navbar />     
            </div>

        <div className="recommended-container">

            <div className="welcome"> Welcome {userData.first_name}</div>
            <form onSubmit={searchForm} className="search-form">
                <label>Search:</label>
                <input type="text" name="search" placeholder="Search users" onChange={(event)=> setSearchUsername(event.target.value)} />

            </form> 

        <div className="select-lang">
            <label>Select Daily Language</label>
            <select onChange={handleSelectOnChange}>

            {/* Map over dailyLanguages and create an option for each language  */}
            {dailyLanguages?.map((language) => (
                <option key={language.linguaid} value={language.linguaid}>
                    {language.linguaname}
                    
                </option>
            ))}
            </select>


        </div>

        {recommendedUsers && 

        (     
            
            <div className="recommendedUsers-contianer">
                         <div className="recommended-word"> Recommended </div>
               
                    {recommendedUsers?.map((recUsers, index)=>{
                        console.log("what's in recUser: ", recUsers)

                        return(
                                <>
                                <Grid>
                                    <Grid item>
                                    <Card sx={{ minWidth: 200, minHeight: 150 }}>
                                        <CardContent>
                                            {/* sx={{justifyContent: "center", display: "flex"}} */}
                                            <Avatar 
                                            alt={recUsers.username} 
                                            src={recUsers.profilepicture} 
                                            sx={{margin:'auto', width: 80, height: 80}}/>

                                            <Typography sx={{paddingBottom:2}} align="center">
                                                {recUsers.first_name}
                                            </Typography>

                                            <CardActions style={{justifyContent: 'center', padding:0}}>
                                                <Link to="/conversations">
                                                    <Button variant="outlined" size="small">Message</Button>
                                                </Link>
                                                <br/>
                                                
                                            </CardActions>

                                            <br/>
                                            <CardActions style={{justifyContent: 'center',padding:0}}>
                                                <Link to={"/userProfile/"+ recUsers.id}>View Profile</Link>
                                            </CardActions>

                                        </CardContent>
                                    </Card>
                                    </Grid>
                                </Grid>
                                </> 
                            )      
                    })} 
            </div>
            )}

        </div>
        </>
              
    )
}