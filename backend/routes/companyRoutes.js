import express from "express";
const router = express.Router();
import { createCompany, getCompany } from "../controllers/companyController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createCompany);
router.route("/:id").get(getCompany);

export default router;
