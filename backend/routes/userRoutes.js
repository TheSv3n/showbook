import express from "express";
const router = express.Router();
import { registerUser, authUser } from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);

export default router;
