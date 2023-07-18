const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const {BCRYPT_WORK_FACTOR}=require("../config")

class UserLingua {
    static async userLinguaCreate(userLinguaData) {
        // Define the required fields for sleep data
    const requiredFields = ["userId", "linguaId", "proficiencyLevel"];
    console.log(userLinguaData.userId)
    console.log(userLinguaData.linguaId)
    console.log(userLinguaData.profLevel)
    // }
      const result =  await db.query(`
         INSERT INTO userLingua(
          userId,
          linguaId,
          proficiencyLevel)
          VALUES($1, $2, $3)
          RETURNING id, userId, linguaId, proficiencyLevel
         `, [userLinguaData.userId, userLinguaData.linguaId, userLinguaData.profLevel])
          const userLinguaResult = result.rows[0]; 
          return userLinguaResult; 
  }
  
  }
  module.exports= UserLingua