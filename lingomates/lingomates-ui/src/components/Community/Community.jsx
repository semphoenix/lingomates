import React from "react";
import "./Community.css";
import Navbar from "../Navbar/Navbar";
import {useState, useEffect} from "react";
import axios from "axios";
import {Card, CardContent, Typography, Avatar, Grid, Button, CardActions}from '@mui/material';
import {Link} from "react-router-dom"
import {TypeAnimation} from "react-type-animation"
import Viewprofile from "../Viewprofile/Viewprofile";

export default function Community({loggedIn, userId, dailyLanguages, setDailyLanguages, setSelectedDailyLanguage, userData}){

    // const [userData, setUserData] = useState({})
    const [recommendedUsers, setRecommendedUsers] = useState(null)
    const [searchUsername, setSearchUsername] = useState("")
    // const [userData, setUserData] = useState({})
    const [loadNumber, setLoadNumber] = useState(1)
    const [displayedUsers, setDisplayedUsers] = useState([])
    // const [searchUserId, setSearchUserId] = useState("")

    console.log("userId value in community: ", userId)
    // console.log("test datas data in community: ", testData)


     const searchForm = async (event) =>{
        event.preventDefault()
        console.log("inside searchForm")
        
         const response = await axios.get(`http://localhost:3001/community/viewUser/${searchUsername}`)
            
         
            console.log("what's in search form response: ", response.data.userInfo.id)
            const searchValue = response.data.userInfo.id
             console.log("searchUserId value: ", searchValue)
        
            window.location.href  = `/userProfile/${searchValue}`;
     }


    useEffect(()=>{
            console.log("hit community useEffect")
        // if current user id exists then do an  axios call that returns current user selected languages
        if(userId){
            try{

                 axios.get(`http://localhost:3001/community/linguas/${userId}`).then((languages)=>{
                     console.log("what's in user selected language(s): ", languages.data.lingasData)
                      setDailyLanguages(languages.data.lingasData)
                 })
 
             }catch{(error)=>{
                 console.log(error);
             }}
        }
           
        
    },[userId])

        const loadMoreUsers = () =>{
                let newNum = loadNumber + 1;
                setDisplayedUsers(recommendedUsers.slice(0,newNum*3))
                setLoadNumber(newNum)
        }

        const handleSelectOnChange = async(event) => {
            const languageId = event.target.value; 

                 axios.get(`http://localhost:3001/community/recommended/${userId}/${languageId}`).then((recUsers)=>{
                    console.log("recommended users: ", recUsers.data.users)       
                    setRecommendedUsers(recUsers.data.users)
                    setSelectedDailyLanguage(languageId)
                    setDisplayedUsers(recUsers.data.users.slice(0,loadNumber*3))
    
                    // once user changes to different language for recommended users need to reset the load number and display only the inital
                    //deisred value of users
                    if(loadNumber > 1){
                        setLoadNumber(1)
                        setDisplayedUsers(recUsers.data.users.slice(0,3))
                    }
                    
                })
            
              
            

             
        }

    console.log("userData: ", userData)
    console.log("userData first name: ", userData.first_name)
    console.log("searched username: ", searchUsername)
    console.log("current users' selected language: ", dailyLanguages)
    console.log("display users: ", displayedUsers)

    return(

        <>
            <div>
                <Navbar userId={userId} />  
                
            </div>

        <div className="recommended-container">

    
            <div className="welcome"> Welcome {userData.first_name}</div>

            <form onSubmit={searchForm} className="search-form">
                <input className="search-input" type="text" name="search" placeholder="Search users" onChange={(event)=> setSearchUsername(event.target.value)} />
            </form> 

        <div className="select-lang">
            <label className="selected-lang-text">Select Language  </label>
            <select className="select-btn" onChange={handleSelectOnChange}>

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
                         <div className="recommended-word"> Recommended Users </div>
               
                    {displayedUsers?.map((recUsers, index)=>{
                        console.log("what's in recUser: ", recUsers)

                        return(
                                <>
                                <Grid>
                                    <Grid item>
                                    <Card sx={{ minWidth: 200, minHeight: 150 }}>
                                        <CardContent>
                                       
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

                    <br/>
                   
                    <Grid container style={{justifyContent:'center'}}>
                       <Grid item style={{display:"inline-block"}}>
                            <Button variant="outlined" onClick={loadMoreUsers}>Load More</Button>
                       </Grid>
                    </Grid>
                    
            </div>
            )}

        </div>
        </>
                
    )
}