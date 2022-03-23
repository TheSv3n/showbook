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
    let companyName;
    if (tempShows[i].company) {
      let company = await Company.findById(tempShows[i].company);
      companyName = company.name;
    }

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

//@desc Update Show
//route PUT /api/shows/:id/
//@access Private
const updateShowInfo = asyncHandler(async (req, res) => {
  const { title, synopsis, company, director } = req.body;
  const show = await Show.findById(req.params.id);

  if (show) {
    show.title = title || show.title;
    show.synopsis = synopsis || show.synopsis;
    show.company = company || show.company;
    show.director = director || show.director;

    await show.save();
    res.status(201).json({ message: "Show Updated" });
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Add Performance
//route POST /api/shows/:id/performances
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
//route POST /api/shows/:id/images
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
//route POST /api/shows/:id/reviews
//@access Private
const addShowReview = asyncHandler(async (req, res) => {
  const { performanceId, comment, rating, privateReview } = req.body;
  const show = await Show.findById(req.params.id);

  if (show) {
    const newReview = {
      performanceId: performanceId,
      comment: comment,
      rating: rating,
      user: req.user._id,
      privateReview: privateReview,
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

//@desc Fetch Logged-in User's Reviews
//@route GET /api/shows/myreviews
//@access Private
const getMyShowReviews = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  let reviews = await getUserReviewsById(req.user._id.toString());

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
        let company;
        let companyName;
        if (shows[0].company) {
          company = await Company.findById(shows[0].company);
          companyName = company.name;
        }

        let user = await User.findById(shows[0].reviews[i].user);
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
          reviewComments: shows[0].reviews[i].reviewComments,
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
//route POST /api/shows/reviews/:id/comments
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

//@desc Update Show Review
//route PUT /api/shows/reviews/:id
//@access Private
const updateShowReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const shows = await Show.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (shows) {
    for (let i = 0; i < shows[0].reviews.length; i++) {
      if (shows[0].reviews[i]._id.toString() === req.params.id) {
        shows[0].reviews[i].comment = comment;
        shows[0].reviews[i].rating = rating;
      }
    }

    await shows[0].save();
    shows[0].numReviews = shows[0].reviews.length;

    shows[0].rating =
      shows[0].reviews.reduce((acc, review) => review.rating + acc, 0) /
      shows[0].reviews.length;
    await shows[0].save();
    res.status(200).json({ message: "Review updated" });
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Update Show Review Comment
//route PUT /api/shows/reviews/:id/comments
//@access Private
const updateShowReviewComment = asyncHandler(async (req, res) => {
  const { comment, commentId } = req.body;
  const shows = await Show.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (shows) {
    for (let i = 0; i < shows[0].reviews.length; i++) {
      if (shows[0].reviews[i]._id.toString() === req.params.id) {
        for (let j = 0; j < shows[0].reviews[i].reviewComments.length; j++) {
          if (
            shows[0].reviews[i].reviewComments[j]._id.toString() === commentId
          ) {
            shows[0].reviews[i].reviewComments[j].comment = comment;
          }
        }
      }
    }

    await shows[0].save();
    res.status(200).json({ message: "Comment Updated" });
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Delete Show Review
//route DELETE /api/shows/reviews/:id
//@access Private
const deleteShowReview = asyncHandler(async (req, res) => {
  const shows = await Show.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (shows) {
    let tempReviews = [...shows[0].reviews];

    let index = -1;

    for (let i = 0; i < tempReviews.length; i++) {
      if (tempReviews[i]._id.toString() === req.params.id) {
        index = i;
      }
    }

    tempReviews.splice(index, 1);
    shows[0].reviews = tempReviews;

    await shows[0].save();
    shows[0].numReviews = shows[0].reviews.length;

    if (shows[0].reviews.length === 0) {
      shows[0].rating = 0;
    } else {
      shows[0].rating =
        shows[0].reviews.reduce((acc, review) => review.rating + acc, 0) /
        shows[0].reviews.length;
    }

    await shows[0].save();
    res.status(200).json({ message: "Review deleted" });
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Delete Show Review Comment
//route DELETE /api/shows/reviews/:id/comments
//@access Private
const deleteShowReviewComment = asyncHandler(async (req, res) => {
  const commentId = req.query.commentId;
  const shows = await Show.find({
    $or: [
      {
        "reviews._id": req.params.id,
      },
    ],
  });

  if (shows) {
    let tempReviews = [...shows[0].reviews];
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
    shows[0].reviews[reviewIndex].reviewComments = tempComments;

    await shows[0].save();
    res.status(200).json({ message: "Comment deleted" });
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

const getUserReviewsById = async (userId, page) => {
  const shows = await Show.find({
    $or: [
      {
        "reviews.user": userId,
      },
    ],
  });

  let reviews = [];

  for (let i = 0; i < shows.length; i++) {
    for (let j = 0; j < shows[i].reviews.length; j++) {
      if (shows[i].reviews[j].user === userId) {
        let company;
        let companyName;
        if (shows[i].company) {
          company = await Company.findById(shows[i].company);
          companyName = company.name;
        }

        let performanceVenueId;
        let performanceDate;

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
          privateReview: shows[i].reviews[j].privateReview,
        };
        reviews = [...reviews, tempReview];
      }
    }
  }
  return reviews;
};

//@desc Fetch User's Show Reviews
//@route GET /api/shows/userreviews/:id
//@access Public
const getUserShowReviews = asyncHandler(async (req, res) => {
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

//@desc Fetch Show Cast Member Roles
//@route GET /api/shows/castmember/:id/roles
//@access Public
const getCastMemberRoles = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  const keyword = {
    $or: [
      {
        "roles.castMemberId": req.params.id,
      },
    ],
  };

  const shows = await Show.find({ ...keyword });

  let roles = [];

  for (let i = 0; i < shows.length; i++) {
    for (let j = 0; j < shows[i].roles.length; j++) {
      if (shows[i].roles[j].castMemberId === req.params.id) {
        let tempRole = {
          showId: shows[i]._id,
          showTitle: shows[i].title,
          showPoster: shows[i].coverImage,
          roleName: shows[i].roles[j].role,
        };
        roles = [...roles, tempRole];
      }
    }
  }

  res.json({ roles });
});

//@desc Add Show Viewer
//route POST /api/shows/:id/viewers
//@access Private
const addShowViewer = asyncHandler(async (req, res) => {
  const { seen, performanceId } = req.body;
  const show = await Show.findById(req.params.id);

  if (show) {
    let userViewing = false;
    for (let i = 0; i < show.viewers.length; i++) {
      if (show.viewers[i].user === req.user._id.toString()) {
        userViewing = true;
      }
    }
    if (!userViewing) {
      const newViewer = {
        seen: seen || false,
        performanceId: performanceId,
        user: req.user._id,
      };

      show.viewers.push(newViewer);

      await show.save();
      res.status(201).json({ message: "Viewer Added" });
    } else {
      res.status(400);
      throw new Error("User already viewing");
    }
  } else {
    res.status(404);
    throw new Error("Show not Found");
  }
});

//@desc Fetch Logged-in User's Reviews
//@route GET /api/shows/mywatchlist
//@access Private
const getMyWatchlist = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  let views = await getUserViewsById(req.user._id.toString());

  res.json({ views });
});

//@desc Fetch User's Watch List
//@route GET /api/shows/watchlist/:id
//@access Public
const getUserWatchlist = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  let tempViews = await getUserViewsById(req.params.id);
  let views = [];

  for (let i = 0; i < tempViews.length; i++) {
    if (!tempViews[i].privateView) {
      views.push(tempViews[i]);
    }
  }

  res.json({ views });
});

const getUserViewsById = async (userId, page) => {
  const shows = await Show.find({
    $or: [
      {
        "viewers.user": userId,
      },
    ],
  });

  let views = [];

  for (let i = 0; i < shows.length; i++) {
    for (let j = 0; j < shows[i].reviews.length; j++) {
      if (shows[i].viewers[j].user === userId) {
        let company;
        let companyName;
        if (shows[i].company) {
          company = await Company.findById(shows[i].company);
          companyName = company.name;
        }
        let performanceVenueId;
        let performanceDate;

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
        let tempView = {
          _id: shows[i].viewers[j]._id,
          seen: shows[i].viewers[j].seen,
          performanceId: shows[i].viewers[j].performanceId,
          performanceVenueId: performanceVenueId,
          performanceVenueName: performanceVenueName,
          performanceDate: performanceDate,
          showId: shows[0]._id,
          title: shows[0].title,
          poster: shows[0].coverImage,
          companyId: shows[0].company,
          companyName: companyName,
        };

        views = [...views, tempView];
      }
    }
  }
  return views;
};

export {
  createShow,
  getAllShows,
  getShow,
  updateShowInfo,
  addPerformance,
  addShowImage,
  addShowReview,
  getVenuePerformances,
  getShowName,
  getCompanyShows,
  addShowRole,
  getMyShowReviews,
  getShowReview,
  addShowReviewComment,
  updateShowReview,
  updateShowReviewComment,
  deleteShowReview,
  deleteShowReviewComment,
  getUserShowReviews,
  getCastMemberRoles,
  addShowViewer,
  getMyWatchlist,
  getUserWatchlist,
};
