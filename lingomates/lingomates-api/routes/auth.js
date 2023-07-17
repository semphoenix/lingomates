const express = require("express")
const router = express.Router(); 
const User = require("../models/user")
const jwt= require("jsonwebtoken")
const db = require("../db")
require("dotenv").config()

router.get("/login", function (req, res) {
    return res.status(200).json({
      ding: "dong",
    })
  })

  //retrieving and returning data from users table 
router.get("/", async function(req, res) {
    const data = await db.query(`SELECT * FROM users`)
    return res.status(200).json(data.rows)
})

//route for login-need to create a user variable which is created once user is authenticated by checking database
router.post("/login", async function(req,res, next){
    console.log("login reached")
    try{
      const user = await User.authenticate(req.body) //takes in user input from body of page as a paramater for authenticate method      
        console.log("login user", user)
      //creates jsonwebtoken for user by taking in 2 paramters-payload(desired data) and SECRET KEY 
      const token = jwt.sign({userId: user.id, username: user.username}, process.env.SECRET_KEY, {
            expiresIn:"1h"
       })

      //returns to component that links to this post
      return res.status(200).json(
        {message:"login successfully",
        token:token,
        user:user})
        

    }catch(err){
        next(err)
    }
})

router.post("/register", async function(req, res,next){
    
    try{
        console.log("whats inside request: ", req.body)
    const user= await User.register(req.body)
     console.log("user info:", user)
        const token=jwt.sign({userId:user.id, username: user.username},
            process.env.SECRET_KEY,
             {
                expiresIn:"1h",
            }
            )

        return res.status(201).json(
            {message:"user register successful",
             token:token,
            user:user})
        
    }catch(err){
         next(err)
     }
})


module.exports = router; 