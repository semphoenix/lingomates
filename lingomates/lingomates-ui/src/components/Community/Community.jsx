import React from "react";
import "./Community.css";
import background1 from "../images/img1.jpeg"
import Navbar from "../Navbar/Navbar";
import {useState, useEffect} from "react"
import axios from "axios";
export default function Community({loggedIn, userId}){

    const [name, setName] = useState("")
    const [recommendedUsers, setRecommendedUsers] = useState("")
    
    console.log("userId value in community: ", userId)
    useEffect(()=>{

        if(userId){
            console.log("inside if statement")
            try{
                axios.get(`http://localhost:3001/auth/community/${userId}`).then((response)=>{
                    console.log("what is this: ", response.data.userData)
                    setName(response.data.userData)
                })
            }catch{(error)=>{
                console.log(error);
            }}
        }
    },[userId])

    console.log("what's in name: ", name)

    return(

        <div>Hello</div>
        // <div  className="background-img">
        //     <Navbar />
        //     {/* <div>
        //         <h1 className="text">Hello</h1>
        //     </div> */}
                
        // </div>
     
    )
}