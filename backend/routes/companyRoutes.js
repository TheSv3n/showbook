import express from "express";
const router = express.Router();
import {
  createCompany,
  getCompany,
  getCompanyName,
} from "../controllers/companyController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createCompany);
router.route("/:id").get(getCompany);
router.route("/:id/name").get(getCompanyName);

export default router;
