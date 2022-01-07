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
  getShowName,
  getCompanyShows,
  addShowRole,
} from "../controllers/showController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createShow).get(getAllShows);
router.route("/:id").get(getShow);
router.route("/:id/performances").put(protect, addPerformance);
router.route("/:id/images").put(protect, addShowImage);
router.route("/:id/reviews").put(protect, addShowReview);
router.route("/:id/roles").put(protect, addShowRole);
router.route("/:id/name").get(getShowName);
router.route("/venue/:id/performances").get(getVenuePerformances);
router.route("/company/:id").get(getCompanyShows);

export default router;
