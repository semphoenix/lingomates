const express = require("express")
const router = express.Router(); 
const User = require("../models/user")
const jwt= require("jsonwebtoken")
const db = require("../db")
require("dotenv").config()
  

//gets all users from database
router.get("/users", async function(req,res){
    const users = await db.query(`SELECT * FROM users`)
    const userData = users.rows
    console.log("whats in users: ", userData)
    return res.status(200).json({userData:userData})
})

router.get("/recommended/:id/:languageId", async function (req, res) {
    const userId = req.params.id;
    const langId = req.params.languageId; 
    console.log("the user is", userId)
    console.log("the language is ", langId)

    const recommendedUsers = await db.query(`SELECT 
    u.first_name,
    u.last_name,
    u.id, 
    l.linguaName, 
    l.countryFlag, 
    l.imageUrl, 
    ul.proficiencyLevel FROM users u 
    INNER JOIN userLingua ul ON u.id = ul.userId 
    INNER JOIN lingua l ON ul.linguaId = l.id 
    WHERE linguaId=${langId} AND userId!=${userId};`)

    console.log("whats in recommended users: ", recommendedUsers)

    const users = recommendedUsers.rows
    return(res.status(200).json({users:users}))
})

router.get("/linguas/:id", async function(req, res){
    const userId = req.params.id;

    const lingas = await db.query(`
    SELECT ul.userid, 
    ul.linguaid, 
    l.id, 
    l.linguaname 
    FROM userlingua ul INNER JOIN lingua l 
    ON ul.linguaid  = l.id WHERE userid=${userId};`)
    const lingasData = lingas.rows
    return res.status(200).json({lingasData:lingasData})

})

//gets and returns userid and linguaid columsn from userLinga table
router.get("/usersLinga", async function(req,res){
    const lingaTable = await db.query(`SELECT userid, linguaid FROM userLingua`)
    const lingaData = lingaTable.rows
    return res.status(200).json({lingaData:lingaData})
})

  //gets and returns specific user based on id passed down
  router.get("/:id", async function(req, res, next) {
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