import express from "express";
const router = express.Router();
import {
  createVenue,
  getVenue,
  getVenueName,
  getAllVenues,
  addVenueReview,
  addVenueImage,
} from "../controllers/venueController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getAllVenues).post(protect, createVenue);
router.route("/:id").get(getVenue);
router.route("/:id/name").get(getVenueName);
router.route("/:id/reviews").put(protect, addVenueReview);
router.route("/:id/images").put(protect, addVenueImage);

export default router;
