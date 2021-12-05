import asyncHandler from "express-async-handler";
import Venue from "../models/venueModel.js";

//@desc Create new venue
//@route POST /api/venues
//@access Private
const createVenue = asyncHandler(async (req, res) => {
  const { name, description, address, images } = req.body;

  const venue = new Venue({
    name,
    creator: req.user._id,
    description,
    address,
    images,
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
    throw new Error("Show not Found");
  }
});

//@desc Add Image
//route PUT /api/shows/:id/images
//@access Private
const addVenueImage = asyncHandler(async (req, res) => {
  const { image } = req.body;
  const venue = await Venue.findById(req.params.id);

  if (venue) {
    const newImage = {
      image: image,
    };

    venue.images.push(newImage);
    await venue.save();
    res.status(201).json({ message: "Image Added" });
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
};
