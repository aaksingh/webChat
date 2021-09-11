import express from "express";
import { login, signUp } from "../controllers/user.js";
import auth from "../middleware/auth.js";
import User from "../models/dbUser.js";
import Conversation from "../models/conversation.js";

const router = express.Router();

router.post("/login", login);
router.post("/signUp", signUp);

router.get("/userDetails", async (req, res) => {
  const user = new User();
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
