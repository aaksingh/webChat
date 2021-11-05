import express from "express";
import { groups } from "../../controllers/groups/groups.js";

const router = express.Router();

router.get("/groups", groups);

export default router;
