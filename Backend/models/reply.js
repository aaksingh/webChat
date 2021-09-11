import mongoose from "mongoose";

const replySchema = mongoose.Schema({
  chat: {
    type: String,
    trim: true,
    required: true,
  },
  senderId: String,
  conversationId: String,
  receiverId: String,
  time: Array,
});

export default mongoose.model("Rep", replySchema);
