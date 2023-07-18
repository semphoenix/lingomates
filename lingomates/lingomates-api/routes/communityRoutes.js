const express = require("express")
const router = express.Router(); 
const User = require("../models/user")
const jwt= require("jsonwebtoken")
const db = require("../db")
require("dotenv").config()
  
  //retrieving and returning data from users table 
  router.get("/community/:id", async function(req, res, next) {
    const requestedId = req.params.id;
    console.log("requested id in community/id: ", requestedId)
    try{
      const userData = await User.fetchUserById(requestedId)
      console.log("whats in userData: ", userData)
      return res.status(200).json({userData:userData})

    }catch(err){
      next(err)
    }
})

module.exports = router; 