const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { NotFoundError } = require("./utils/errors")
const config = require("./config")
const authRoutes = require("./routes/auth")
const linguaRoutes = require("./routes/linguaRoutes")
const userLinguaRoutes = require("./routes/userLinguaRoutes")
const profileRoutes=require("./routes/profileRoutes")
const communityRoutes = require("./routes/communityRoutes")
const app = express()
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors:{
    origin:"http://localhost:5173", //url for our front end
    methods:["GET", "POST"] //methods we are accepting   
  }
});

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`)


  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message",data)
  })

  socket.on("join_room", (data)=>{
    console.log("room is", data)
    socket.join(data)
})
   
});

httpServer.listen(3001, ()=> {
  console.log("Server listening on port 3001")
});

app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("tiny"))

//enabling the /routes - using the imported routes
app.use("/auth", authRoutes)
app.use("/lingua", linguaRoutes)
app.use("/userLingua", userLinguaRoutes)

app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })


  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (!config.IS_TESTING) console.error(err.stack)
    const status = err.status || 500
    const message = err.message
  
    return res.status(status).json({
      error: { message, status },
    })
  })
  


module.exports = app