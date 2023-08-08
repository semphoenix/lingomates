const db = require("../db")
const bcrypt = require("bcrypt")
const {validateFields} = require("../utils/validate")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const {BCRYPT_WORK_FACTOR}=require("../config")
const User = require("../models/user")

class Community{

    static async fetchUserByUsername(username){
        
        const result = await db.query(`
        SELECT id FROM users WHERE username = $1
        `,[username])

        const searchUser = result.rows;
        

        return searchUser;
    }
}

module.exports= Community