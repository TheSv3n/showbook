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

//@desc Fetch All Shows
//@route GET /api/shows
//@access Public
const getAllShows = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const ranked = req.query.ranked;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            title: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Show.countDocuments({ ...keyword });
  const shows = await Show.find({ ...keyword })
    .sort(ranked === "true" ? { rating: -1 } : { createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ shows, page, pages: Math.ceil(count / pageSize), count });
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

export { createShow, getAllShows, getShow, addPerformance };
