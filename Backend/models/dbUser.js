import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: String,
  id: String,
});

export default mongoose.model("UserDetail", userSchema);
