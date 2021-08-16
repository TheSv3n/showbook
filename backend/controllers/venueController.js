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

export { createVenue, getVenue };
