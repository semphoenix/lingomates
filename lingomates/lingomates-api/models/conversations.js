const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const {BCRYPT_WORK_FACTOR}=require("../config")

class Conversations{

    static async getAllChats(user1){
        const result= await db.query(
           `SELECT DISTINCT c.id AS conversationId,roomConvo, dm.senderId, dm.receiverId
            FROM conversation c
            INNER JOIN directMessage dm ON c.roomConvo = dm.room
            WHERE dm.receiverId=$1 OR dm.senderId=$1;`, [user1]
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
        const chatId= result.rows[0];
        return chatId
    }
    static async fetchAllRoomswithUser(user1){
        const result=await db.query(
            `SELECT * FROM conversation 
            WHERE roomConvo IN(SELECT room FROM directMessage
            WHERE senderId=$1 OR receiverId=$1 )`,[user1]
        )
        const rooms=result.rows[0]
        return rooms

    }

    static async fetchPreviousMessagesfromRoom(roomNum){
        console.log(roomNum)
        const result= await db.query(
            `SELECT * FROM directMessage
            WHERE room=$1`, [roomNum]
        )
      
        const previousChat=result.rows
        console.log("previous chat in fetchPreviousMessagesfromRoom", previousChat)
        return previousChat

    }
    static async RoomToJoin(user1,user2){
        let room=[user1,user2]
        room=room.sort()
        room=room.toString()

        const existingChat= await Conversations.fetchConvoByRoom(room)
        if(existingChat){
            return existingChat
        }
        else{
            const newRoom=Conversations.conversationCreate(user1, user2)
            return newRoom
        }

    }

    
}
module.exports=Conversations