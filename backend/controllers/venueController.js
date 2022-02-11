import asyncHandler from "express-async-handler";
import Venue from "../models/venueModel.js";

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

//@desc Fetch Logged-in User's Reviews
//@route GET /api/venues/myreviews
//@access Private
const getMyVenueReviews = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  let reviews = await getUserReviewsById(req.user._id.toString());

  res.json({ reviews });
});

export {
  createVenue,
  getVenue,
  getVenueName,
  getAllVenues,
  addVenueReview,
  addVenueImage,
  getMyVenueReviews,
};
