import express from "express";
import { details } from "../../controllers/userDetails/userDetails.js";

const router = express.Router();

router.get("/userDetails", details);

export default router;
