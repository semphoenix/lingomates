const db = require("../db")
const bcrypt = require("bcrypt")
const {validateFields} = require("../utils/validate")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const {BCRYPT_WORK_FACTOR}=require("../config")

class User{
    //convert user from database into a user object that can be manipulated and viewed publically

    //creates a user oject that holds values from database
    static createPublicUser(user){
        return{
            id: user.id, 
            firstName : user.first_name,
            lastName : user.last_name, 
            email : user.email, 
            profilePicture : user.profilePicture,
            nativeLanguage : user.nativeLanguage,
            description : user.description
            // location : user.location, 
            // date : user.date
        }
    }

    //authentification function-authenticates givensss user credentials
    static async authenticate(creds){
        const {email, password} = creds
        console.log("authenticate info:", creds)
        console.log("whats in email: ", email)
        const requiredCreds = ["email", "password"]
        //checking if user provided required credentials-email and password
        try{         
            validateFields({required: requiredCreds, obj: creds, location: "user authentication"})

        } catch(err){
            throw err
        }
    
        //calls fetch function and if the email parameter matches an email
        //in the database then returns a user object
        const user = await User.fetchUserByEmail(email)
            console.log("whats in user: ", user)

        if(user){
            //compares user given password to hashed password in db
            const isValid = await bcrypt.compare(password, user.password)
            console.log("isValid?", isValid)
            if(isValid == true){
                return User.createPublicUser(user) //returns desired user information to frontend
            }
        }else{
            //throw an error here
          console.log("user doesn't exist")
            throw new UnauthorizedError("invalid username or password")
        }
    }

    //register function 
    static async register(creds){
        
        const requiredFields = ["email","password","firstName","lastName","username","nativeLanguage"]
        requiredFields.forEach(field=>{
            if(!creds.hasOwnProperty(field)){
               throw new BadRequestError(`Missing ${field} in request body`)
            }
        })
        if (creds.email.indexOf("@")<=0){
            throw new BadRequestError("invalid email.")
        }
       const existingUser=await User.fetchUserByEmail(creds.email)
       if (existingUser){
        throw new BadRequestError(`Duplicate email: ${creds.email} `)
       }
       const hashedPassword=await bcrypt.hash(creds.password,BCRYPT_WORK_FACTOR)
       const lowerCasedEmail=creds.email.toLowerCase()

       //adding user information into the database
       const result =  await db.query(`
       INSERT INTO users(
        email,
        password,
        first_name,
        last_name,
        username,
        profilePicture,
        nativeLanguage,
        description)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, email, first_name, last_name, username, profilePicture, nativeLanguage, description
       `, [lowerCasedEmail, hashedPassword, creds.firstName, creds.lastName, creds.username, creds.profilePicture, creds.nativeLanguage, creds.description])

        const user = result.rows[0]; 
        return user; 
    }

    static async fetchUserByEmail(email){

        const result = await db.query(
        `SELECT id,
                email,
                password,
                first_name,
                last_name,
                username,
                profilePicture,
                nativeLanguage,
                description

        FROM users WHERE email = $1`,[email.toLowerCase()]
        )
        const user = result.rows[0]
        return user; 
    }

    static async fetchUserById(requestedId){

        console.log("this is the requested id in fetch by id: ", requestedId)

        const result = await db.query(
            `SELECT username, first_name, last_name, email, username , profilePicture, nativeLanguage, description 
            FROM users WHERE id=$1`, [requestedId]
        )

        const userData = result.rows;
        return userData;
    }
}

module.exports= User