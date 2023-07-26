const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");
const Conversations = require("./conversations");

class DirectMessage {
  static async createMessage(roomId, sender, reciever, message) {
    const existingChat = await Conversations.fetchConvoByRoom(roomId);
    console.log("existingChat: ")
    console.log(existingChat)


    if (existingChat) {
        console.log("-----IN IF!-----")
      const result = await db.query(
        `
            INSERT INTO directMessage(
                room, 
                senderId,
                receiverId,
                messageText)
                VALUES($1,$2,$3,$4)
                RETURNING id, room ,senderId,receiverId,messageText,messaged_at
            `,
        [roomId, sender, reciever, message]
      );

      const userMessage = result.rows[0];
      return userMessage;
    } 
    else {
        console.log("-----IN ELSE!-----")
        const convo= await Conversations.conversationCreate(sender,reciever)
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
            [convo.roomconvo, sender, reciever, message]
          );
    
          const userMessage = result.rows[0];
          return userMessage;



    }
  }
}

module.exports = DirectMessage;
