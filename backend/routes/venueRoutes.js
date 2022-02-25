import express from "express";
const router = express.Router();
import {
  createVenue,
  getVenue,
  updateVenueInfo,
  getVenueName,
  getAllVenues,
  addVenueReview,
  addVenueImage,
  getMyVenueReviews,
  getUserVenueReviews,
  getVenueReview,
  updateVenueReview,
  deleteVenueReview,
  addVenueReviewComment,
  updateVenueReviewComment,
  deleteVenueReviewComment,
} from "../controllers/venueController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getAllVenues).post(protect, createVenue);
router.route("/myreviews").get(protect, getMyVenueReviews);
router.route("/:id").get(getVenue).put(protect, updateVenueInfo);
router.route("/:id/name").get(getVenueName);
router.route("/:id/reviews").put(protect, addVenueReview);
router.route("/:id/images").put(protect, addVenueImage);
router.route("/userreviews/:id").get(getUserVenueReviews);
router
  .route("/reviews/:id")
  .get(getVenueReview)
  .put(protect, updateVenueReview)
  .delete(protect, deleteVenueReview);

router
  .route("/reviews/:id/comments")
  .post(protect, addVenueReviewComment)
  .put(protect, updateVenueReviewComment)
  .delete(protect, deleteVenueReviewComment);
export default router;
