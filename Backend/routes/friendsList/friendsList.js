import express from "express";
import { friendsLists } from "../../controllers/friendsList/friendsList.js";

const router = express.Router();

router.get("/friendsList", friendsLists);

export default router;
