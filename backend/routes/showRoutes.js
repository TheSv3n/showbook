import express from "express";
const router = express.Router();
import { createShow } from "../controllers/showController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createShow);

export default router;
