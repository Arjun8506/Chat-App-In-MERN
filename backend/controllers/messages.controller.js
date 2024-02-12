import Conversation from "../models/conversation.model.js";
import Message from "../models/messages.model.js";

export const sendMessage = async (req, res) =>{
    try {
        const { message } = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        console.log(req.body);
        console.log(message);

        if (!message) {
            return res.status(400).json({ error: "Message content is required" });
        }        

        let conversationbtUsers = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]}
        })

        if (!conversationbtUsers) {
            conversationbtUsers = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message: message
        })

        if (newMessage) {
            await newMessage.save();
            conversationbtUsers.messages.push(newMessage._id)
        }

        // SOCKET IO FUNCTIONALITY

        await conversationbtUsers.save();

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("error in sendMeassage component", error.message);
        return res.status(500).json({error: "Internal Server Error!"})
    }
}

export const getMessage = async (req, res) => {
    
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]}
        }).populate("messages");

        if (!conversation) {
            res.status(200).json([])
        }

        res.status(200).json(conversation.messages)
        
    } catch (error) {
        console.log("error in getMessage component", error.message);
        return res.status(500).json({error: "Internal Server Error!"})
    }
}