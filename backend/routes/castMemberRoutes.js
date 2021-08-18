import express from "express";
const router = express.Router();
import { createCastMember } from "../controllers/castMemberController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createCastMember);

export default router;
