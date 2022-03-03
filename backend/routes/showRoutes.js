import express from "express";
const router = express.Router();
import {
  createShow,
  getAllShows,
  getShow,
  updateShowInfo,
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
  getUserShowReviews,
  getCastMemberRoles,
  addShowViewer,
} from "../controllers/showController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createShow).get(getAllShows);
router.route("/myreviews").get(protect, getMyShowReviews);
router.route("/:id").get(getShow).put(protect, updateShowInfo);
router.route("/:id/performances").put(protect, addPerformance);
router.route("/:id/images").post(protect, addShowImage);
router.route("/:id/reviews").post(protect, addShowReview);
router.route("/:id/viewers").post(protect, addShowViewer);
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
router.route("/castmember/:id/roles").get(getCastMemberRoles);

router.route("/userreviews/:id").get(getUserShowReviews);

export default router;
