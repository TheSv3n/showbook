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
  getMyShowReviews,
  getShowReview,
  addShowReviewComment,
  updateShowReview,
  updateShowReviewComment,
  deleteShowReview,
  deleteShowReviewComment,
  getUserReviews,
} from "../controllers/showController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createShow).get(getAllShows);
router.route("/myreviews").get(protect, getMyShowReviews);
router.route("/:id").get(getShow);
router.route("/:id/performances").put(protect, addPerformance);
router.route("/:id/images").put(protect, addShowImage);
router.route("/:id/reviews").post(protect, addShowReview);
router.route("/:id/roles").put(protect, addShowRole);
router.route("/:id/name").get(getShowName);
router.route("/venue/:id/performances").get(getVenuePerformances);
router.route("/company/:id").get(getCompanyShows);
router
  .route("/reviews/:id")
  .get(getShowReview)
  .put(protect, updateShowReview)
  .delete(protect, deleteShowReview);
router
  .route("/reviews/:id/comments")
  .post(protect, addShowReviewComment)
  .put(protect, updateShowReviewComment)
  .delete(protect, deleteShowReviewComment);

router.route("/userreviews/:id").get(getUserReviews);

export default router;
