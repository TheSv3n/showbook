import asyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";
import User from "../models/userModel.js";

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

//@desc Update Company
//route PUT /api/companies/:id/
//@access Private
const updateCompanyInfo = asyncHandler(async (req, res) => {
  const { name, description, headquarters } = req.body;
  const company = await Company.findById(req.params.id);

  if (company) {
    company.name = name || company.name;
    company.description = description || company.description;
    company.headquarters = headquarters || company.headquarters;

    await company.save();
    res.status(201).json({ message: "Company Updated" });
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
//@route GET /api/companies/myreviews
//@access Private
const getMyCompanyReviews = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  let reviews = await getUserReviewsById(req.user._id.toString());

  res.json({ reviews });
});

//@desc Fetch User's Company Reviews
//@route GET /api/companies/userreviews/:id
//@access Public
const getUserCompanyReviews = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  let tempReviews = await getUserReviewsById(req.params.id);
  let reviews = [];

  for (let i = 0; i < tempReviews.length; i++) {
    if (!tempReviews[i].privateReview) {
      reviews.push(tempReviews[i]);
    }
  }

  res.json({ reviews });
});

//@desc Fetch Company Review
//route GET /api/company/reviews/:id
//@access Public
const getCompanyReview = asyncHandler(async (req, res) => {
  const companies = await Company.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (companies) {
    let review;

    for (let i = 0; i < companies[0].reviews.length; i++) {
      if (companies[0].reviews[i]._id.toString() === req.params.id) {
        let user = await User.findById(companies[0].reviews[i].user);
        let userName = user.userName;

        review = {
          _id: companies[0].reviews[i]._id,
          comment: companies[0].reviews[i].comment,
          rating: companies[0].reviews[i].rating,
          user: companies[0].reviews[i].user,
          userName: userName,
          createdAt: companies[0].reviews[i].createdAt,
          updatedAt: companies[0].reviews[i].updatedAt,
          reviewComments: companies[0].reviews[i].reviewComments,
          companyId: companies[0]._id,
          companyName: companies[0].name,
          companyCoverImage: companies[0].coverImage,
        };
      }
    }

    res.json(review);
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

//@desc Update Company Review
//route PUT /api/companies/reviews/:id
//@access Private
const updateCompanyReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const companies = await Company.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (companies) {
    for (let i = 0; i < companies[0].reviews.length; i++) {
      if (companies[0].reviews[i]._id.toString() === req.params.id) {
        companies[0].reviews[i].comment = comment;
        companies[0].reviews[i].rating = rating;
      }
    }

    await companies[0].save();
    companies[0].numReviews = companies[0].reviews.length;

    companies[0].rating =
      companies[0].reviews.reduce((acc, review) => review.rating + acc, 0) /
      companies[0].reviews.length;
    await companies[0].save();
    res.status(200).json({ message: "Review updated" });
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

//@desc Delete Company Review
//route DELETE /api/companies/reviews/:id
//@access Private
const deleteCompanyReview = asyncHandler(async (req, res) => {
  const companies = await Company.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (companies) {
    let tempReviews = [...companies[0].reviews];

    let index = -1;

    for (let i = 0; i < tempReviews.length; i++) {
      if (tempReviews[i]._id.toString() === req.params.id) {
        index = i;
      }
    }

    tempReviews.splice(index, 1);
    companies[0].reviews = tempReviews;

    await companies[0].save();
    companies[0].numReviews = companies[0].reviews.length;

    companies[0].rating =
      companies[0].reviews.reduce((acc, review) => review.rating + acc, 0) /
      companies[0].reviews.length;

    await companies[0].save();
    res.status(200).json({ message: "Review deleted" });
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

//@desc Add Company Review Comment
//route POST /api/companies/reviews/:id/comments
//@access Private
const addCompanyReviewComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const companies = await Company.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (companies) {
    const newComment = {
      comment: comment,
      user: req.user._id,
    };

    for (let i = 0; i < companies[0].reviews.length; i++) {
      if (companies[0].reviews[i]._id.toString() === req.params.id) {
        companies[0].reviews[i].reviewComments.push(newComment);
      }
    }

    await companies[0].save();
    res.status(201).json({ message: "Comment Added" });
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

//@desc Update Company Review Comment
//route PUT /api/companies/reviews/:id/comments
//@access Private
const updateCompanyReviewComment = asyncHandler(async (req, res) => {
  const { comment, commentId } = req.body;
  const companies = await Company.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (companies) {
    for (let i = 0; i < companies[0].reviews.length; i++) {
      if (companies[0].reviews[i]._id.toString() === req.params.id) {
        for (
          let j = 0;
          j < companies[0].reviews[i].reviewComments.length;
          j++
        ) {
          if (
            companies[0].reviews[i].reviewComments[j]._id.toString() ===
            commentId
          ) {
            companies[0].reviews[i].reviewComments[j].comment = comment;
          }
        }
      }
    }

    await companies[0].save();
    res.status(200).json({ message: "Comment Updated" });
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

//@desc Delete Company Review Comment
//route DELETE /api/companies/reviews/:id/comments
//@access Private
const deleteCompanyReviewComment = asyncHandler(async (req, res) => {
  const commentId = req.query.commentId;
  const companies = await Company.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (companies) {
    let tempReviews = [...companies[0].reviews];
    let tempComments;

    let reviewIndex = -1;
    let commentIndex = -1;

    for (let i = 0; i < tempReviews.length; i++) {
      if (tempReviews[i]._id.toString() === req.params.id) {
        tempComments = [...tempReviews[i].reviewComments];
        reviewIndex = i;
        for (let j = 0; j < tempComments.length; j++) {
          if (tempComments[j]._id.toString() === commentId) {
            commentIndex = j;
          }
        }
      }
    }

    tempComments.splice(commentIndex, 1);
    companies[0].reviews[reviewIndex].reviewComments = tempComments;

    await companies[0].save();
    res.status(200).json({ message: "Comment deleted" });
  } else {
    res.status(404);
    throw new Error("Company not Found");
  }
});

export {
  createCompany,
  getCompany,
  updateCompanyInfo,
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
  updateCompanyReviewComment,
  deleteCompanyReviewComment,
};
