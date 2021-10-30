import mongoose from "mongoose";

const groups = mongoose.Schema({
  ownerId: String,
  roomName: String,
  room: Array,
  ownerName: String,
  //   ownerName: String,
});

export default mongoose.model("Groups", groups);
