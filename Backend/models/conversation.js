import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
  time: Array,
  senderId: String,
  receiverId: String,
  messageID: String,
  message: {
    message: String,
    referenceId: String,
    read: Boolean,
    attachments: Boolean,
  },
});

export default mongoose.model("Conversation", conversationSchema);
