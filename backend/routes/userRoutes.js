import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserName,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/:id/username").get(getUserName);

export default router;
