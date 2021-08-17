import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
  time: Array,
  senderId: String,
  receiverId: String,
  conversationId: String,
  message: {
    message: String,
    referenceId: String,
    read: Boolean,
    authorId: String,
    attachments: Array,
  },
});

export default mongoose.model("Conversation", conversationSchema);
