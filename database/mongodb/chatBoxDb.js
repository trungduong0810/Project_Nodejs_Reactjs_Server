import mongoose from "mongoose";
const chatBoxProject = new mongoose.Schema({
  senderId: Number,
  receiverId: Number,
  messageContent: String,
  images: {
    type: [String],
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatBox = mongoose.model("ChatBox", chatBoxProject);
export default chatBox;
