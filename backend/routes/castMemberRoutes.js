import express from "express";
const router = express.Router();
import {
  createCastMember,
  linkCastMemberAccount,
} from "../controllers/castMemberController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createCastMember);
router.route("/:id/linkaccount").put(protect, admin, linkCastMemberAccount);

export default router;
