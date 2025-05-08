import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";

export const getUsersForSidebar = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        {
          senderId: new mongoose.Types.ObjectId(req.user._id),
          receiverId: new mongoose.Types.ObjectId(id),
        },
        {
          senderId: new mongoose.Types.ObjectId(id),
          receiverId: new mongoose.Types.ObjectId(req.user._id),
        },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  const { id } = req.params;
  const { text, image } = req.body;
  try {
    let imageUrl;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage.secure_url;
    }
    const message = await Message.create({
      senderId: req.user._id,
      receiverId: id,
      text,
      image: imageUrl,
    });

    // socket.io

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
