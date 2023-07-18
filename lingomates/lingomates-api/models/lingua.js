const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const {BCRYPT_WORK_FACTOR}=require("../config")

class Lingua {
    static async linguaCreate(linguaData) {
        // Define the required fields for sleep data
    const requiredFields = ["linguaName", "countryFlag", "imageUrl"];
    
    // Check if all required fields are present in the sleepData object
    for (const field of requiredFields) {
      if (!linguaData.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in lingua data`);
      }
  
    }
      const result =  await db.query(`
         INSERT INTO lingua(
          linguaName,
          countryFlag,
          imageUrl)
          VALUES($1, $2, $3)
          RETURNING id, linguaName, countryFlag, imageUrl
         `, [linguaData.linguaName, linguaData.countryFlag, linguaData.imageUrl])
          const linguaResult = result.rows[0]; 
          return linguaResult; 
  }
  
  }
  module.exports= Lingua