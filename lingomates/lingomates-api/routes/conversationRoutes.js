const express = require("express")
const router = express.Router(); 
const User = require("../models/user")
const Conversations=require("../models/conversations")
const jwt= require("jsonwebtoken")
const db = require("../db")
require("dotenv").config()

router.get("/userConversations/:id",async function(request, response, next){
    const userId=request.params.id;
    
    console.log("user Id is", userId)
    try{
        const userData=await Conversations.getAllChats(userId)

        console.log("the conversations held so far are: " , userData)
        return response.status(200).json({userData:userData});

    }catch(err){
        next(err)
    }

})









module.exports=router