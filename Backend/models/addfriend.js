import mongoose from "mongoose";

const addfriendSchema = mongoose.Schema({
  s1: String,
  s2: String,
});

export default mongoose.model("AddFriend", addfriendSchema);
