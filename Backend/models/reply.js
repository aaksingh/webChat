import mongoose from "mongoose";

const replySchema = mongoose.Schema({
  time: Number,
  senderId: String,
  receiverId: String,
  messageId: Number,
  roomId: String,
  referenceId: Number,
  message: {
    message: String,
    read: Boolean,
    attachments: Boolean,
  },
});

export default mongoose.model("Rep", replySchema);
