import asyncHandler from "express-async-handler";
import Show from "../models/showModel.js";

//@desc Create new show
//@route POST /api/shows
//@access Private
const createShow = asyncHandler(async (req, res) => {
  const { title, synopsis, company, director, images, roles, performances } =
    req.body;

  const show = new Show({
    title,
    creator: req.user._id,
    synopsis,
    company,
    director,
    images,
    roles,
    performances,
  });

  const createdShow = await show.save();

  res.status(201).json(createdShow);
});

//@desc Fetch show
//@route GET /api/shows/:id
//@access Public
const getShow = asyncHandler(async (req, res) => {
  const show = await Show.findById(req.params.id);

  if (show) {
    res.json(show);
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Add Performance
//route PUT /api/shows/:id/performances
//@access Private
const addPerformance = asyncHandler(async (req, res) => {
  const { venueId, date } = req.body;
  const show = await Show.findById(req.params.id);

  if (show) {
    const newPerformance = {
      venueId: venueId,
      date: date,
    };

    show.performances.push(newPerformance);
    await show.save();
    res.status(201).json({ message: "Performance Added" });
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

export { createShow, getShow, addPerformance };
