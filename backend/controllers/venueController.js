import asyncHandler from "express-async-handler";
import Venue from "../models/venueModel.js";
import User from "../models/userModel.js";

//@desc Create new venue
//@route POST /api/venues
//@access Private
const createVenue = asyncHandler(async (req, res) => {
  const { name, description, address, images } = req.body;

  const coverImage = req.coverImage || "/uploads/defaultVenue.jpg";

  const venue = new Venue({
    name,
    creator: req.user._id,
    description,
    address,
    images,
    coverImage,
    approved: false,
  });

  const createdVenue = await venue.save();

  res.status(201).json(createdVenue);
});

//@desc Fetch Venue
//@route GET /api/venues/:id
//@access Public
const getVenue = asyncHandler(async (req, res) => {
  const venue = await Venue.findById(req.params.id);

  if (venue) {
    res.json(venue);
  } else {
    res.status(404);
    throw new Error("Venue not Found");
  }
});

//@desc Get Venue name
//@route GET /api/venues/:id/name
//@access Public
const getVenueName = asyncHandler(async (req, res) => {
  const venue = await Venue.findById(req.params.id);

  if (venue) {
    res.json(venue.name);
  } else {
    res.status(404);
    throw new Error("Venue not Found");
  }
});

//@desc Fetch All Venues
//@route GET /api/venues
//@access Public
const getAllVenues = asyncHandler(async (req, res) => {
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

  const count = await Venue.countDocuments({ ...keyword });
  const venues = await Venue.find({ ...keyword })
    .sort(ranked === "true" ? { rating: -1 } : { createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ venues, page, pages: Math.ceil(count / pageSize), count });
});

//@desc Add Venue Review
//route PUT /api/venues/:id/reviews
//@access Private
const addVenueReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const venue = await Venue.findById(req.params.id);

  if (venue) {
    const newReview = {
      comment: comment,
      rating: rating,
      user: req.user._id,
    };

    venue.reviews.push(newReview);

    venue.numReviews = venue.reviews.length;

    venue.rating =
      venue.reviews.reduce((acc, review) => review.rating + acc, 0) /
      venue.reviews.length;

    await venue.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Venue not Found");
  }
});

//@desc Add Image
//route PUT /api/venues/:id/images
//@access Private
const addVenueImage = asyncHandler(async (req, res) => {
  const { image, comment } = req.body;
  const venue = await Venue.findById(req.params.id);

  if (venue) {
    const newImage = {
      image: image,
      comment: comment,
      user: req.user._id,
    };

    venue.images.push(newImage);
    await venue.save();
    res.status(201).json({ message: "Image Added" });
  } else {
    res.status(404);
    throw new Error("Venue not Found");
  }
});

const getUserReviewsById = async (userId, page) => {
  const venues = await Venue.find({
    $or: [
      {
        "reviews.user": userId,
      },
    ],
  });

  let reviews = [];

  for (let i = 0; i < venues.length; i++) {
    for (let j = 0; j < venues[i].reviews.length; j++) {
      if (venues[i].reviews[j].user === userId) {
        let tempReview;
        tempReview = {
          reviewId: venues[i].reviews[j]._id,
          rating: venues[i].reviews[j].rating,
          name: venues[i].name,
          venueId: venues[i]._id,
          image: venues[i].coverImage,
        };
        reviews = [...reviews, tempReview];
      }
    }
  }

  return reviews;
};

//@desc Fetch Logged-in User's Venue Reviews
//@route GET /api/venues/myreviews
//@access Private
const getMyVenueReviews = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  let reviews = await getUserReviewsById(req.user._id.toString());

  res.json({ reviews });
});

//@desc Fetch User's Venue Reviews
//@route GET /api/venues/userreviews/:id
//@access Public
const getUserVenueReviews = asyncHandler(async (req, res) => {
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

//@desc Fetch Venue Review
//route GET /api/venues/reviews/:id
//@access Public
const getVenueReview = asyncHandler(async (req, res) => {
  const venues = await Venue.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (venues) {
    let review;

    for (let i = 0; i < venues[0].reviews.length; i++) {
      if (venues[0].reviews[i]._id.toString() === req.params.id) {
        let user = await User.findById(venues[0].reviews[i].user);
        let userName = user.userName;

        review = {
          _id: venues[0].reviews[i]._id,
          comment: venues[0].reviews[i].comment,
          rating: venues[0].reviews[i].rating,
          user: venues[0].reviews[i].user,
          userName: userName,
          createdAt: venues[0].reviews[i].createdAt,
          updatedAt: venues[0].reviews[i].updatedAt,
          reviewComments: venues[0].reviews[i].reviewComments,
          venueId: venues[0]._id,
          venueName: venues[0].name,
          venueCoverImage: venues[0].coverImage,
        };
      }
    }

    res.json(review);
  } else {
    res.status(404);
    throw new Error("Venue not Found");
  }
});

//@desc Update Venue Review
//route PUT /api/venue/reviews/:id
//@access Private
const updateVenueReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const venues = await Venue.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (venues) {
    for (let i = 0; i < venues[0].reviews.length; i++) {
      if (venues[0].reviews[i]._id.toString() === req.params.id) {
        venues[0].reviews[i].comment = comment;
        venues[0].reviews[i].rating = rating;
      }
    }

    await venues[0].save();
    venues[0].numReviews = venues[0].reviews.length;

    venues[0].rating =
      venues[0].reviews.reduce((acc, review) => review.rating + acc, 0) /
      venues[0].reviews.length;
    await venues[0].save();
    res.status(200).json({ message: "Review updated" });
  } else {
    res.status(404);
    throw new Error("Venue not Found");
  }
});

//@desc Delete Venue Review
//route DELETE /api/venues/reviews/:id
//@access Private
const deleteVenueReview = asyncHandler(async (req, res) => {
  const venues = await Venue.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (venues) {
    let tempReviews = [...venues[0].reviews];

    let index = -1;

    for (let i = 0; i < tempReviews.length; i++) {
      if (tempReviews[i]._id.toString() === req.params.id) {
        index = i;
      }
    }

    tempReviews.splice(index, 1);
    venues[0].reviews = tempReviews;

    await venues[0].save();
    venues[0].numReviews = venues[0].reviews.length;

    venues[0].rating =
      venues[0].reviews.reduce((acc, review) => review.rating + acc, 0) /
      venues[0].reviews.length;

    await venues[0].save();
    res.status(200).json({ message: "Review deleted" });
  } else {
    res.status(404);
    throw new Error("Venue not Found");
  }
});

//@desc Add Venue Review Comment
//route POST /api/venues/reviews/:id/comments
//@access Private
const addVenueReviewComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const venues = await Venue.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (venues) {
    const newComment = {
      comment: comment,
      user: req.user._id,
    };

    for (let i = 0; i < venues[0].reviews.length; i++) {
      if (venues[0].reviews[i]._id.toString() === req.params.id) {
        venues[0].reviews[i].reviewComments.push(newComment);
      }
    }

    await venues[0].save();
    res.status(201).json({ message: "Comment Added" });
  } else {
    res.status(404);
    throw new Error("Venue not Found");
  }
});

//@desc Update Venue Review Comment
//route PUT /api/venues/reviews/:id/comments
//@access Private
const updateVenueReviewComment = asyncHandler(async (req, res) => {
  const { comment, commentId } = req.body;
  const venues = await Venue.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (venues) {
    for (let i = 0; i < venues[0].reviews.length; i++) {
      if (venues[0].reviews[i]._id.toString() === req.params.id) {
        for (let j = 0; j < venues[0].reviews[i].reviewComments.length; j++) {
          if (
            venues[0].reviews[i].reviewComments[j]._id.toString() === commentId
          ) {
            venues[0].reviews[i].reviewComments[j].comment = comment;
          }
        }
      }
    }

    await venues[0].save();
    res.status(200).json({ message: "Comment Updated" });
  } else {
    res.status(404);
    throw new Error("Venue not Found");
  }
});

//@desc Delete Venue Review Comment
//route DELETE /api/venues/reviews/:id/comments
//@access Private
const deleteVenueReviewComment = asyncHandler(async (req, res) => {
  const commentId = req.query.commentId;
  const venues = await Venue.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (venues) {
    let tempReviews = [...venues[0].reviews];
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
    venues[0].reviews[reviewIndex].reviewComments = tempComments;

    await venues[0].save();
    res.status(200).json({ message: "Comment deleted" });
  } else {
    res.status(404);
    throw new Error("Venue not Found");
  }
});

export {
  createVenue,
  getVenue,
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
};
