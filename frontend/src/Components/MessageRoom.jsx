import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { MdSend } from "react-icons/md";
import axios from "axios";
import { fetchMessagesApi, sendMessageApi } from "../api/messageApi";


const MessageRoom = ({ selectedFriend }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [sendMessageData, setSendMessageData] = useState("");
  const [participants, setParticipants] = useState([]);

  
  useEffect(() => {
    if (selectedFriend) {
      const showMessages = async () => {
        const chat = await fetchMessagesApi(selectedFriend._id);

        if (chat) {
          setMessages(chat.messages || []);
          setParticipants(chat.participants || []);
        } else {
          setMessages([]);
          setParticipants([]);
        }
      };

      showMessages();
    }
  }, [selectedFriend]);

   

  const handleSendMessage = (e)=>{
    e.preventDefault();
    const sendMsg = async () =>{
      const res = await sendMessageApi(selectedFriend._id, sendMessageData);
      console.log(res);
      setSendMessageData("");
    }

    sendMsg();

  }

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-900">
      {/* Display messages */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => {
          return (
            <div
              key={msg._id}
              className={`max-w-xs p-2 text-xs rounded-lg ${
                msg.senderId == user._id
                  ? "self-end ml-auto bg-pink-800 text-white"
                  : "self-start bg-purple-950 text-white"
              }`}
            >
              {msg.message}
            </div>
          );
        })}
      </div>

      {/* Message input */}
      <div className="mt-4 flex items-center border-t border-gray-700 pt-4">
        <input
          type="text"
          value={sendMessageData}
          onChange={(e)=> setSendMessageData(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 text-xs text-white p-2 rounded-lg focus:outline-none"
        />
        <button 
        onClick={handleSendMessage}
        className="bg-pink-600 text-white ml-2 p-2 rounded-lg hover:bg-pink-700">
          <MdSend size={16} />
        </button>
      </div>
    </div>
  );
};

export default MessageRoom;
