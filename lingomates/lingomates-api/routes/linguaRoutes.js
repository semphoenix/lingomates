const express = require('express');
const router = express.Router();
const Lingua = require('../models/lingua');
const db = require('../db')

let languagesInserted = false;

router.post("/", async function (req, res, next) {
    if (languagesInserted) {
        res.sendStatus(200)
        console.log("languages already inserted")
    } else {
    const languages = [
        { linguaName: 'English', countryFlag: 'usa', imageUrl: 'src/assets/english.png' },
        { linguaName: 'French', countryFlag: 'france', imageUrl: 'src/assets/french.png' },
        { linguaName: 'German', countryFlag: 'germany', imageUrl: 'src/assets/german.png' },
        { linguaName: 'Italian', countryFlag: 'italy', imageUrl: 'src/assets/italian.png' },
        { linguaName: 'Spanish', countryFlag: 'spanish', imageUrl: 'src/assets/spanish.png' },
        { linguaName: 'Swedish', countryFlag: 'swedish', imageUrl: 'src/assets/swedish.png' },
      ];
      
    try{
    for (const language of languages) {
        await Lingua.linguaCreate(language)
    }
    languagesInserted = true
    return res.status(200);
} catch(err){
    console.log(err)
    return res.status(500)
 }
}
})

router.get("/",async function (req, res, next) {
    const data = await db.query(`SELECT * FROM lingua`)
    console.log("lingua info from data", data.rows)
    return res.status(200).json(data.rows)
})

module.exports = router;

