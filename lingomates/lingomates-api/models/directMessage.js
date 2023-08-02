const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");
const Conversations = require("./conversations");

class DirectMessage {
  static async createMessage(roomId, sender, receiver, message, translatedText) {
    const existingChat = await Conversations.fetchConvoByRoom(roomId);
    

    if (existingChat) {
        console.log("-----IN IF!-----")
      const result = await db.query( 
        `
            INSERT INTO directMessage(
                room, 
                senderId,
                receiverId,
                messageText,
                translatedText)
                VALUES($1,$2,$3,$4,$5)
                RETURNING id, room ,senderId,receiverId,messageText,messaged_at
            `,
        [roomId, sender, receiver, message,translatedText]
      );

      const userMessage = result.rows[0];
      return userMessage;
    } 
    else {
        console.log("-----IN ELSE!-----")
        const convo= await Conversations.conversationCreate(sender,receiver)
        console.log("convo in direct message: ")
        console.log(convo)
        const result = await db.query(
            `INSERT INTO directMessage(
                    room, 
                    senderId,
                    receiverId,
                    messageText)
                    VALUES($1,$2,$3,$4)
                    RETURNING id, room,senderId,receiverId,messageText,messaged_at
                `,
            [convo.roomconvo, sender, receiver, message]
          );
    
          const userMessage = result.rows[0];
          return userMessage;



    }
  }
}

module.exports = DirectMessage;
