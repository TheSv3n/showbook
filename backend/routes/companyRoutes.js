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
  getUserCompanyReviews,
  getCompanyReview,
  updateCompanyReview,
  deleteCompanyReview,
  addCompanyReviewComment,
} from "../controllers/companyController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createCompany).get(getAllCompanies);
router.route("/myreviews").get(protect, getMyCompanyReviews);
router.route("/:id").get(getCompany);
router.route("/:id/name").get(getCompanyName);
router.route("/:id/reviews").put(protect, addCompanyReview);
router.route("/:id/images").put(protect, addCompanyImage);
router.route("/userreviews/:id").get(getUserCompanyReviews);
router
  .route("/reviews/:id")
  .get(getCompanyReview)
  .put(protect, updateCompanyReview)
  .delete(protect, deleteCompanyReview);
router.route("/reviews/:id/comments").post(protect, addCompanyReviewComment);

export default router;
