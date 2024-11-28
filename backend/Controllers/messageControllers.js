import Chat from "../Models/ChatModel.js";
import Message from "../Models/MessageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let chat = await Chat.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
      });
    }

    const newMsg = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMsg) {
      chat.messages.push(newMsg._id);
    }

    //await chat.save();
    //await newMsg.save();

    await Promise.all([chat.save(), newMsg.save()]);

    res.status(200).json(newMsg);
  } catch (error) {
    res.status(500).json({ message: `server side error: ${error}` });
  }
};

export const allMessages = async (req, res) => {
  try {
    const { id: friendId } = req.params;
    const senderId = req.user._id;

    const chat = await Chat.findOne({
      participants: { $all: [senderId, friendId] },
    }).populate("messages", "message senderId");

    if (!chat) return res.status(200).json([]);

    res.status(200).json({ chat });
  } catch (error) {
    res.status(500).json({ message: `get msgs  error: ${error}` });
  }
};
