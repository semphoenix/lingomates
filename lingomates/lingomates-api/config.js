require("dotenv").config()
//require("colors")

//to use values from .env need to put them into this folder
const PORT = process.env.PORT ? Number(process.env.PORT):3001

function getDatabaseUri(){
   const dbUser = process.env.DATABASE_USER || "postgres"
   const dbPass = process.env.DATABASE_PASS? encodeURI(process.env.DATABASE_PASS) : "postgres" //checks if password does exist then encode it
   const dbHost = process.env.DATABASE_HOST || "localhost"
   const dbPort = process.env.DATABASE_PORT || "5432"
   const dbName = process.env.DATABASE_NAME || "lingomate"
   // DATABASE_TEST_NAME=lifetracker_test

   const dbHostedURL = "postgres://lingomatedb_user:X2OGVfYglv6IUsN2ptDGDw8mK1KU9hF0@dpg-cja4ocq683bs739cmsog-a.oregon-postgres.render.com/lingomatedb?ssl=true"
   //external = postgres://lingomatedb_user:X2OGVfYglv6IUsN2ptDGDw8mK1KU9hF0@dpg-cja4ocq683bs739cmsog-a.oregon-postgres.render.com/lingomatedb
   //if user supplies database url use that else make it yourself
  return  dbHostedURL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?ssl=true` //full database connection string

}
const BCRYPT_WORK_FACTOR=13
const SECRET_KEY="SOMETHING_SUPER_SECRET_GOES_HERE"

module.exports = {
    PORT,
    getDatabaseUri,
    BCRYPT_WORK_FACTOR
}
