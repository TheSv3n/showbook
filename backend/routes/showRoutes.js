import express from "express";
const router = express.Router();
import {
  createShow,
  getAllShows,
  getShow,
  addPerformance,
  addShowImage,
  addShowReview,
  getVenuePerformances,
} from "../controllers/showController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createShow).get(getAllShows);
router.route("/:id").get(getShow);
router.route("/:id/performances").put(protect, addPerformance);
router.route("/:id/images").put(protect, addShowImage);
router.route("/:id/reviews").put(protect, addShowReview);
router.route("/venue/:id/performances").get(getVenuePerformances);

export default router;
