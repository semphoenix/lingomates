import React, { useEffect, useState, useCallback } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import "./Chat.css"

function Chat({ socket, room, senderId, receiverId }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [previousMessages, setPreviousMessages] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/conversationRoutes/previousMessages", {
        room,
      })
      .then((res) => {
        setPreviousMessages(res.data);
        //console.log(previousMessages)
      });
  }, []);


  const handleTranslate = async (text) => {

    //console.log('in handleTranslate');

    try {
      const apiKey = import.meta.env.VITE_TRANSLATE_API;
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

  //   This async function is going to take the current message that we input in the box and create an object that saves
  //   the message, the author, the room, and the time where the message is sent
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        sender: senderId,
        receiver: receiverId,
        translatedText:await handleTranslate(currentMessage),
        message: currentMessage,

        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      //console.log(messageData)
      //socket.emit creates an event "Send_message" which takes in the the object generated above and send it to the backend
      //and the messages state declared at the top is called and the new message object is added into it. The current message is cleared out
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  //this callback function is used to make sure that it run only when there
  //are changes in the function and not everytime it renders other parts
  const handleReceiveMessage = useCallback((data) => {
    //takes in the list of messages from previous interaction and adds the new message
    setMessageList((list) => [...list, data]);
  }, []);

  //This useEffect is an event listner from the back end to detect any incoming messages
  useEffect(() => {
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, handleReceiveMessage]);

 

  console.log("whats in message list: ", messageList)
 //console.log("wahts in previous messages: ", previousMessages)
  return (
    <div className="chatContainer">
    <div className="chat-window">
      <div className="chat-header">
        <p>Lingomates Chat</p>
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {" "}
          {/* go to the bottom of the page everytime */}
          {previousMessages.previousConvo
            ? previousMessages.previousConvo.map((previousMessage, index) => {
                return (
                  <div
                    key={index}
                    className="message"
                    id={senderId === previousMessage.senderid ? "you" : "other"} 
                  >
                    <div className="message-translate">
                      <div className="message-content">
                        <p>{previousMessage.messagetext}</p>
                      </div>
                      <div className="tooltip" >Translate
                    <span className="translatedText tooltiptext">{previousMessage.translatedtext}</span>
                  </div>
                
                    </div>
                  </div>
                );
              })
            : ""}
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={senderId === messageContent.sender ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="tooltip">Translate
                    <span className="translatedText tooltiptext">{messageContent.translatedText}</span>
                  </div>
                
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    {/* <p id="author">{messageContent.author}</p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  </div>
  );
}

export default Chat;
