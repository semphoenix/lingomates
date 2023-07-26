const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const {BCRYPT_WORK_FACTOR}=require("../config")

class Conversations{

    static async getAllChats(user1){
        const result= await db.query(
           `SELECT c.id AS conversationId, dm.senderId, dm.receiverId
            FROM conversation c
            INNER JOIN directMessage dm ON c.roomConvo = dm.room
            WHERE dm.receiverId=$1;`, [user1]
        );
        const allChats=result.rows;
        return allChats;

    }

    static async conversationCreate(user1,user2){
        
        let room=[user1,user2]
        room=room.sort()
        room=room.toString()
        const existingChat= await Conversations.fetchConvoByRoom(room)
        
        if(existingChat){
            throw new BadRequestError('Room already exists')
        }

        const result = await db.query(
            `INSERT INTO conversation(roomConvo) VALUES($1) RETURNING *`, [room]
        )

        const convo= result.rows[0]
        return convo
    }


    static async fetchConvoByRoom(room){
        const result= await db.query(
            `SELECT id, roomConvo FROM conversation
            WHERE roomConvo=$1 `, [room]
        )
        const chatId= result.rowCount;
        return chatId
    }

    
}
module.exports=Conversations