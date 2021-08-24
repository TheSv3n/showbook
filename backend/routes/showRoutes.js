import express from "express";
const router = express.Router();
import {
  createShow,
  getAllShows,
  getShow,
  addPerformance,
} from "../controllers/showController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createShow).get(getAllShows);
router.route("/:id").get(getShow);
router.route("/:id/performances").put(protect, addPerformance);

export default router;
