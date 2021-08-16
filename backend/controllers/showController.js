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

export { createShow };
