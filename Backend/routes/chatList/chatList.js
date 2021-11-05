import express from "express";
import { chatList } from "../../controllers/chatList/chatList.js";

const router = express.Router();

router.get("/chatList", chatList);

export default router;
