import express from "express";
import { create } from "../../controllers/create/create.js";

const router = express.Router();

router.get("/create", create);

export default router;
