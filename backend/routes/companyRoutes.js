import express from "express";
const router = express.Router();
import {
  createCompany,
  getCompany,
  getCompanyName,
  getAllCompanies,
  addCompanyReview,
  addCompanyImage,
  getMyCompanyReviews,
} from "../controllers/companyController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createCompany).get(getAllCompanies);
router.route("/myreviews").get(protect, getMyCompanyReviews);
router.route("/:id").get(getCompany);
router.route("/:id/name").get(getCompanyName);
router.route("/:id/reviews").put(protect, addCompanyReview);
router.route("/:id/images").put(protect, addCompanyImage);

export default router;
