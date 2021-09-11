import mongoose from "mongoose";

const addfriendSchema = mongoose.Schema({
  members: {
    type: Array,
  },
});

export default mongoose.model("AddFriend", addfriendSchema);
