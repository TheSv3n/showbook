import asyncHandler from "express-async-handler";
import Show from "../models/showModel.js";

//@desc Create new show
//@route POST /api/shows
//@access Private
const createShow = asyncHandler(async (req, res) => {
  const { title, synopsis, company, director, images, roles, performances } =
    req.body;

  const coverImage = req.body.coverImage || "/uploads/defaultShow.jpg";

  const show = new Show({
    title,
    creator: req.user._id,
    synopsis,
    company,
    director,
    coverImage,
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

//@desc Add Image
//route PUT /api/shows/:id/images
//@access Private
const addShowImage = asyncHandler(async (req, res) => {
  const { image, performance, comment } = req.body;
  const show = await Show.findById(req.params.id);

  if (show) {
    const newImage = {
      image: image,
      user: req.user._id,
      performanceId: performance,
      comment: comment,
    };

    show.images.push(newImage);
    await show.save();
    res.status(201).json({ message: "Image Added" });
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Add Show Review
//route PUT /api/shows/:id/reviews
//@access Private
const addShowReview = asyncHandler(async (req, res) => {
  const { performanceId, comment, rating } = req.body;
  const show = await Show.findById(req.params.id);

  if (show) {
    const newReview = {
      performanceId: performanceId,
      comment: comment,
      rating: rating,
      user: req.user._id,
    };

    show.reviews.push(newReview);

    show.numReviews = show.reviews.length;

    show.rating =
      show.reviews.reduce((acc, review) => review.rating + acc, 0) /
      show.reviews.length;

    await show.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Fetch Show Venue Performances
//@route GET /api/shows/venue/:id/performances
//@access Public
const getVenuePerformances = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  const keyword = {
    $or: [
      {
        "performances.venueId": req.params.id,
      },
    ],
  };

  const shows = await Show.find({ ...keyword });

  let performances = [];

  for (let i = 0; i < shows.length; i++) {
    for (let j = 0; j < shows[i].performances.length; j++) {
      if (shows[i].performances[j].venueId === req.params.id) {
        let tempPerformance = {
          showId: shows[i]._id,
          performance: shows[i].performances[j],
        };
        performances = [...performances, tempPerformance];
      }
    }
  }

  res.json({ performances });
});

//@desc Get Show name
//@route GET /api/shows/:id/name
//@access Public
const getShowName = asyncHandler(async (req, res) => {
  const show = await Show.findById(req.params.id);

  if (show) {
    res.json(show.title);
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Fetch Company Shows
//@route GET /api/shows/company/:id
//@access Public
const getCompanyShows = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  const keyword = {
    $or: [
      {
        company: req.params.id,
      },
    ],
  };

  const shows = await Show.find({ ...keyword });

  res.json({ shows });
});

//@desc Add Show role
//route PUT /api/shows/:id/roles
//@access Private
const addShowRole = asyncHandler(async (req, res) => {
  const { role, castMemberId } = req.body;
  const show = await Show.findById(req.params.id);

  if (show) {
    const newRole = {
      castMemberId: castMemberId,
      user: req.user._id,
      role: role,
    };

    show.roles.push(newRole);
    await show.save();
    res.status(201).json({ message: "Role Added" });
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Fetch Show Venue Performances
//@route GET /api/shows/venue/:id/performances
//@access Public
const getUserReviews = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  const keyword = {
    $or: [
      {
        "reviews.user": req.user._id,
      },
    ],
  };

  const shows = await Show.find({ ...keyword });

  let reviews = [];

  for (let i = 0; i < shows.length; i++) {
    for (let j = 0; j < shows[i].reviews.length; j++) {
      if (shows[i].reviews[j].user === req.user._id.toString()) {
        let tempReview = {
          poster: shows[i].coverImage,
          rating: shows[i].reviews[j].rating,
          title: shows[i].title,
          showId: shows[i]._id,
          company: shows[i].company,
        };
        reviews = [...reviews, tempReview];
      }
    }
  }

  res.json({ reviews });
});

export {
  createShow,
  getAllShows,
  getShow,
  addPerformance,
  addShowImage,
  addShowReview,
  getVenuePerformances,
  getShowName,
  getCompanyShows,
  addShowRole,
  getUserReviews,
};
