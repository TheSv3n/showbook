import asyncHandler from "express-async-handler";
import Show from "../models/showModel.js";
import Company from "../models/companyModel.js";
import Venue from "../models/venueModel.js";
import User from "../models/userModel.js";

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
  const tempShows = await Show.find({ ...keyword })
    .sort(ranked === "true" ? { rating: -1 } : { createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  //add company names
  let shows = [];
  for (let i = 0; i < tempShows.length; i++) {
    let company = await Company.findById(tempShows[i].company);
    let companyName = company.name;
    let tempShow = {
      _id: tempShows[i]._id,
      title: tempShows[i].title,
      coverImage: tempShows[i].coverImage,
      companyName: companyName,
      synopsis: tempShows[i].synopsis,
      performanceCount: tempShows[i].performances.length,
      reviewCount: tempShows[i].reviews.length,
      rating: tempShows[i].rating,
    };

    shows = [...shows, tempShow];
  }
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

//@desc Fetch User Reviews
//@route GET /api/myreviews
//@access Private
const getUserReviews = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  const shows = await Show.find({
    $or: [
      {
        "reviews.user": req.user._id,
      },
    ],
  });

  let reviews = [];

  for (let i = 0; i < shows.length; i++) {
    for (let j = 0; j < shows[i].reviews.length; j++) {
      if (shows[i].reviews[j].user === req.user._id.toString()) {
        let company = await Company.findById(shows[i].company);
        let performanceVenueId;
        let performanceDate;
        let companyName = company.name;
        let performanceVenueName;
        for (let k = 0; k < shows[i].performances.length; k++) {
          if (
            shows[i].performances[k]._id.toString() ===
            shows[i].reviews[j].performanceId
          ) {
            performanceVenueId = shows[i].performances[k].venueId;
            performanceDate = shows[i].performances[k].date;
          }
        }
        let venue = await Venue.findById(performanceVenueId);
        performanceVenueName = venue.name;
        let tempReview = {
          reviewId: shows[i].reviews[j]._id,
          poster: shows[i].coverImage,
          rating: shows[i].reviews[j].rating,
          title: shows[i].title,
          showId: shows[i]._id,
          companyId: shows[i].company,
          companyName: companyName,
          performanceId: shows[i].reviews[j].performanceId,
          performanceVenueId: performanceVenueId,
          performanceVenueName: performanceVenueName,
          reviewDate: shows[i].reviews[j].createdAt,
          performanceDate: performanceDate,
        };
        reviews = [...reviews, tempReview];
      }
    }
  }

  res.json({ reviews });
});

//@desc Fetch Show Review
//route GET /api/shows/reviews/:id
//@access Public
const getShowReview = asyncHandler(async (req, res) => {
  const shows = await Show.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (shows) {
    let review;

    for (let i = 0; i < shows[0].reviews.length; i++) {
      if (shows[0].reviews[i]._id.toString() === req.params.id) {
        let company = await Company.findById(shows[0].company);
        let user = await User.findById(shows[0].reviews[i].user);
        let companyName = company.name;
        let userName = user.userName;
        let performanceVenueId;
        let performanceDate;
        let performanceVenueName;
        for (let j = 0; j < shows[0].performances.length; j++) {
          if (
            shows[0].performances[j]._id.toString() ===
            shows[0].reviews[i].performanceId
          ) {
            performanceVenueId = shows[0].performances[j].venueId;
            performanceDate = shows[0].performances[j].date;
          }
        }
        let venue = await Venue.findById(performanceVenueId);
        performanceVenueName = venue.name;
        review = {
          _id: shows[0].reviews[i]._id,
          performanceId: shows[0].reviews[i].performanceId,
          comment: shows[0].reviews[i].comment,
          rating: shows[0].reviews[i].rating,
          user: shows[0].reviews[i].user,
          userName: userName,
          createdAt: shows[0].reviews[i].createdAt,
          updatedAt: shows[0].reviews[i].updatedAt,
          showId: shows[0]._id,
          showTitle: shows[0].title,
          showCoverImage: shows[0].coverImage,
          showCompanyId: shows[0].company,
          showCompanyName: companyName,
          performanceVenueId: performanceVenueId,
          performanceVenueName: performanceVenueName,
          performanceDate: performanceDate,
        };
      }
    }

    res.json(review);
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Add Show Review Comment
//route PUT /api/shows/reviews/:id/comments
//@access Private
const addShowReviewComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const shows = await Show.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (shows) {
    const newComment = {
      comment: comment,
      user: req.user._id,
    };

    for (let i = 0; i < shows[0].reviews.length; i++) {
      if (shows[0].reviews[i]._id.toString() === req.params.id) {
        shows[0].reviews[i].reviewComments.push(newComment);
      }
    }

    await shows[0].save();
    res.status(201).json({ message: "Comment Added" });
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
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
  getShowReview,
  addShowReviewComment,
};
