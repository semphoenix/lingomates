import React from "react";
import "./Community.css";
import Navbar from "../Navbar/Navbar";
import {useState, useEffect} from "react"
import axios from "axios";

export default function Community({loggedIn, userId, dailyLanguages, setDailyLanguages, setSelectedDailyLanguage}){

    const [userData, setUserData] = useState({})
    const [recommendedUsers, setRecommendedUsers] = useState(null)
    const [filteredLang, setFilteredLang] = useState([])
    const [userList, setUserList] = useState([])
    const [usersLanguageData, setUsersLanguageData] = useState([])
    const [searchUsername, setSearchUsername] = useState("")

    console.log("userId value in community: ", userId)

     const searchForm = (event) =>{
        event.preventDefault()
        console.log("inside searchForm")
     }
    useEffect(()=>{
        if(userId){
            try{

                // axios.get(`/recommended/${userId}`).then((response)=>{
                //     console.log("who is recommended: ", response.data)
                //     setRecommendedUsers(response.data)

                //gets current user that is logged in based on userId-comes from user id from token
                axios.get(`http://localhost:3001/community/${userId}`).then((response)=>{
                    console.log("what is this: ", response.data.userData[0])
                    setUserData(response.data.userData[0])})

                // axios.get(`http://localhost:3001/community/usersLinga`).then((langData)=>{
                //     console.log("what's in lingData: ", langData.data.lingaData)
                //     setUsersLanguageData(langData.data.lingaData)
                // })

                // //gets list of users in database
                // axios.get(`http://localhost:3001/community/users`).then((users)=>{
                //     console.log("what's in user: ", users.data.userData)
                //     setUserList(users.data.userData)
                // })
                

                axios.get(`http://localhost:3001/community/linguas/${userId}`).then((languages)=>{
                    console.log("what's in user selected language(s): ", languages.data.lingasData)
                     setDailyLanguages(languages.data.lingasData)
                })

                
                // })

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
            <div>
                Recommended
                    {recommendedUsers?.map((recUsers, index)=>{
                        console.log("what's in recUser: ", recUsers)

                        return(
                                <>
                                <div key={index} className="recommendedUsers-contianer">
                                    <span>{recUsers.first_name}</span>
                                </div>
                                </> 
                            )      
                    })} 
            </div>)}
        </div>
        </>
          

        // <div  className="background-img">
        //     <Navbar />
        //     {/* <div>
        //         <h1 className="text">Hello</h1>
        //     </div> */}
                
        // </div>
     
    )
}