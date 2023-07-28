const express = require('express');
const router = express.Router();
const UserLingua = require('../models/userLingua');
const { BadRequestError } = require('../utils/errors');
const db = require('../db')

router.post("/", async function (req, res, next) {

    try {
        const userId = req.body.userId;    
        const profLevels = req.body.profLevels
        // console.log(profLevels)
        console.log("userID is,", userId)
        console.log("req is", req.body)
        for (const language in profLevels) {
          const profLevel = profLevels[language];
          console.log("Prof level is", profLevel)
          console.log("userId is", userId)
    
          // Retrieve linguaId from lingua table based on linguaName
          const linguaResult = await db.query('SELECT id FROM lingua WHERE linguaName = $1', [language]);
          const linguaId = linguaResult.rows[0]?.id;

          //Retriever userId from users table based on email

          // Create user language proficiency
          await UserLingua.userLinguaCreate({
            userId,
            linguaId,
            profLevel,
          });
        }
    
        res.sendStatus(200);
      } catch (error) {
        next(error);
      }
    });

router.get("/",async function (req, res, next) {
    const data = await db.query(`SELECT * FROM userLingua`)
    console.log("userLingua info from data", data.rows)
    return res.status(200).json(data.rows)
})

module.exports = router;