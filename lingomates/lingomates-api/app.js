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
const conversationRoutes=require("./routes/conversationRoutes")
const app = express()
const { createServer } = require("http");
const { Server } = require("socket.io");
const DirectMessage=require("./models/directMessage")
const axios = require('axios')

const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors:{
    origin:"http://localhost:5173", //url for our front end
    methods:["GET", "POST"] //methods we are accepting   
  }
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(" ----THE ROOM TO BE JOINED IS----- THE RESPONSE FOR JOIN_ROOM EVENT FROM FRONT END IS")
    console.log(data)
    
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  
  socket.on("send_message",async (data) => {
    const {message, sender, receiver,translatedText, time} = data 
  
    console.log(`data is...`)
    console.log(data)
    console.log(translatedText)

    const room=[sender, receiver].sort().toString()
    console.log(room)
    console.log("Data in Send Message: ")
    console.log(data)

    socket.to(room).emit("receive_message", data);

    DirectMessage.createMessage(room, sender, receiver,  message, translatedText)    

  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
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
app.use("/profile", profileRoutes)
app.use("/community", communityRoutes)
app.use("/conversationRoutes",conversationRoutes)

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