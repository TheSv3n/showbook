import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserName,
  getUserProfile,
  getUserById,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, getUserProfile);
router.route("/login").post(authUser);
router.route("/:id").get(getUserById);
router.route("/:id/username").get(getUserName);

export default router;
