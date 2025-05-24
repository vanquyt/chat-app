import userModel from "../models/user.model.js";
import messageModel from "../models/message.model.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUser);
    } catch (error) {
        console.error("Error in getUserForSidebar controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await messageModel
            .find({
                $or: [
                    { sender: myId, receiver: userToChatId },
                    { sender: userToChatId, receiver: myId },
                ],
            });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await messageModel({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // realtime use socket.io

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};