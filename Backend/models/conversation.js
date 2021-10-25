import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
  time: Number,
  senderId: String,
  receiverId: String,
  messageId: Number,
  roomId: String,
  message: {
    message: String,
    referenceId: String,
    read: Boolean,
    attachments: Boolean,
  },
});

export default mongoose.model("Conversation", conversationSchema);
