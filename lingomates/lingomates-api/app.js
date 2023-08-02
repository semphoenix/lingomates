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

  const handleTranslate = async (text) => {

    console.log('in handleTranslate');

    try {
      const apiKey = 'AIzaSyAKtF_T0kYOb7G6sMd_R9BPxPJm5PesNqI';
      const targetLanguage = 'en';  //Target code for english

      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          q: text,
          target: targetLanguage,

        }
      );

      if (!response.data || !response.data.data.translations || !response.data.data.translations[0]) {
        throw new Error('Translation API failed');
      }
      
      const translatedText = await response.data.data.translations[0].translatedText;
      return translatedText;

    } catch (error) {
      console.error('Error translating:', error);
    }
  };
 console.log("I want to see the translated text" ,handleTranslate("adios"))
  socket.on("send_message",async (data) => {
    const {message, sender, receiver, time} = data 
    let translatedText = await handleTranslate(message);
    console.log(`translatedText is`, translatedText);
    data.translatedText = translatedText;
    console.log(`data is...`)
    console.log(data)

    const room=[sender, receiver].sort().toString()
    console.log(room)
    console.log("Data in Send Message: ")
    console.log(data)

    socket.to(room).emit("receive_message", data);

    DirectMessage.createMessage(room, sender, receiver, message)    

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