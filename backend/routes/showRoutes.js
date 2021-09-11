import express from "express";
const router = express.Router();
import {
  createShow,
  getAllShows,
  getShow,
  addPerformance,
  addImage,
  addReview,
} from "../controllers/showController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createShow).get(getAllShows);
router.route("/:id").get(getShow);
router.route("/:id/performances").put(protect, addPerformance);
router.route("/:id/images").put(protect, addImage);
router.route("/:id/reviews").put(protect, addReview);

export default router;
