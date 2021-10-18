import express from "express";
const router = express.Router();
import {
  createCastMember,
  getCastMember,
  linkCastMemberAccount,
  getCastMemberName,
  getCastMemberList,
} from "../controllers/castMemberController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createCastMember).get(getCastMemberList);
router.route("/:id").get(getCastMember);
router.route("/:id/linkaccount").put(protect, admin, linkCastMemberAccount);
router.route("/:id/name").get(getCastMemberName);

export default router;
