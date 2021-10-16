import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
  time: Array,
  senderId: String,
  receiverId: String,
  messageId: Number,
  message: {
    message: String,
    referenceId: String,
    read: Boolean,
    attachments: Boolean,
  },
});

export default mongoose.model("Conversation", conversationSchema);
