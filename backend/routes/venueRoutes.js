import express from "express";
const router = express.Router();
import { createVenue, getVenue } from "../controllers/venueController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createVenue);
router.route("/:id").get(getVenue);

export default router;
