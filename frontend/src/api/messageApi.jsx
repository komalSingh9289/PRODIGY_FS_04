import axios from "axios";

const token = localStorage.getItem("token");

export const fetchMessagesApi = async (receiverId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/messages/${receiverId}`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    return response.data.chat;
    console.log(response);
     // Return only the chat data
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};


export const sendMessageApi = async (friendId, message) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/messages/send/${friendId}`,
      { message },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    return response.data; // Return the newly created message
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};


