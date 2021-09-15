import express from "express";
const router = express.Router();
import {
  createVenue,
  getVenue,
  getVenueName,
} from "../controllers/venueController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createVenue);
router.route("/:id").get(getVenue);
router.route("/:id/name").get(getVenueName);

export default router;
