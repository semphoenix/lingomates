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
        // This array is going to be userData without the duplicate convoId chats
        const uniqueArray=[]
        // we use sets for making sure that duplicate values are not stored
        const uniqueConversationIdsSet=new Set()  
         
        userData.forEach(convo => {
            if (!uniqueConversationIdsSet.has(convo.conversationid)) {
              uniqueConversationIdsSet.add(convo.conversationid);
              uniqueArray.push(convo);
            }
          });
        
        console.log("the conversations held so far are: " , uniqueArray)
        for (index in uniqueArray){

          console.log("current Array receiver is is ", uniqueArray[index].receiverid)
          if(uniqueArray[index].senderid==userId){
            const receiverint=parseInt(uniqueArray[index].receiverid)
            
            const other= await User.fetchUserById(receiverint)
            uniqueArray[index].otherProfile=other[0]
          }
          else{
            const senderint=parseInt(uniqueArray[index].senderid)
            const other=await User.fetchUserById(senderint)
            uniqueArray[index].otherProfile=other[0]
          }
        }
        console.log("UNIQUE ARRAY AFTER THE PROFILE OF OTHER USER IS ADDED", uniqueArray)
        return response.status(200).json({userData:uniqueArray});

    }catch(err){
        next(err)
    }

})
router.post("/previousMessages", async function(request, response,next){
    const room = request.body.room;
    console.log(room)
    try{
        let previousConvo=await Conversations.fetchPreviousMessagesfromRoom(room)
        
        return response.status(200).json({previousConvo:previousConvo})   
    }
    catch(err){
        next(err)
    }
}) 
router.get("/:id", async function(req, res, next) {
    const requestedId = req.params.id;
    console.log("receiver id in community/id: ", requestedId)
    try{
      const userData = await User.fetchUserById(requestedId)
      return res.status(200).json({userData:userData})

    }catch(err){
      next(err)
    }
})

router.post("/communityJoinRoom", async function(request, response,next){
  
  console.log(request.body)
  const user1=request.body.userId
  const user2=request.body.chosenUser

  try{
    const roomJoined= await Conversations.RoomToJoin(user1, user2)
    return response.status(200).json({room:roomJoined})
  }
  catch{
    next(err)
  }

})


module.exports=router