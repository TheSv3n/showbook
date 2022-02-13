import asyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";

//@desc Create new company
//@route POST /api/companies
//@access Private
const createCompany = asyncHandler(async (req, res) => {
  const { name, description, headquarters } = req.body;
  const coverImage = req.body.coverImage || "/uploads/defaultCompany.jpg";

  const company = new Company({
    name,
    creator: req.user._id,
    description,
    headquarters,
    coverImage,
  });

  const createdCompany = await company.save();

  res.status(201).json(createdCompany);
});

//@desc Fetch company
//@route GET /api/companies/:id
//@access Public
const getCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    res.json(company);
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

//@desc Get Company name
//@route GET /api/companies/:id/name
//@access Public
const getCompanyName = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    res.json(company.name);
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

//@desc Fetch All Companies
//@route GET /api/companies
//@access Public
const getAllCompanies = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const ranked = req.query.ranked;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Company.countDocuments({ ...keyword });
  const companies = await Company.find({ ...keyword })
    .sort(ranked === "true" ? { rating: -1 } : { createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ companies, page, pages: Math.ceil(count / pageSize), count });
});

//@desc Add Company Review
//route PUT /api/companies/:id/reviews
//@access Private
const addCompanyReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const company = await Company.findById(req.params.id);

  if (company) {
    const newReview = {
      comment: comment,
      rating: rating,
      user: req.user._id,
    };

    company.reviews.push(newReview);

    company.numReviews = company.reviews.length;

    company.rating =
      company.reviews.reduce((acc, review) => review.rating + acc, 0) /
      company.reviews.length;

    await company.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

//@desc Add Image
//route PUT /api/companies/:id/images
//@access Private
const addCompanyImage = asyncHandler(async (req, res) => {
  const { image, comment } = req.body;
  const company = await Company.findById(req.params.id);

  if (company) {
    const newImage = {
      image: image,
      comment: comment,
      user: req.user._id,
    };

    company.images.push(newImage);
    await company.save();
    res.status(201).json({ message: "Image Added" });
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

const getUserReviewsById = async (userId, page) => {
  const companies = await Company.find({
    $or: [
      {
        "reviews.user": userId,
      },
    ],
  });

  let reviews = [];

  for (let i = 0; i < companies.length; i++) {
    for (let j = 0; j < companies[i].reviews.length; j++) {
      if (companies[i].reviews[j].user === userId) {
        let tempReview;
        tempReview = {
          reviewId: companies[i].reviews[j]._id,
          rating: companies[i].reviews[j].rating,
          name: companies[i].name,
          companyId: companies[i]._id,
          image: companies[i].coverImage,
        };
        reviews = [...reviews, tempReview];
      }
    }
  }

  return reviews;
};

//@desc Fetch Logged-in User's Reviews
//@route GET /api/venues/myreviews
//@access Private
const getMyCompanyReviews = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  let reviews = await getUserReviewsById(req.user._id.toString());

  res.json({ reviews });
});

export {
  createCompany,
  getCompany,
  getCompanyName,
  getAllCompanies,
  addCompanyReview,
  addCompanyImage,
  getMyCompanyReviews,
};
