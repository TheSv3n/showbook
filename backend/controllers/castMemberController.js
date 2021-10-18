import asyncHandler from "express-async-handler";
import CastMember from "../models/castMemberModel.js";

//@desc Create new cast member
//@route POST /api/castmembers
//@access Private
const createCastMember = asyncHandler(async (req, res) => {
  const { name, company, image, position } = req.body;

  const castMember = new CastMember({
    creator: req.user._id,
    name,
    company,
    image,
    position,
  });

  const createdCastMember = await castMember.save();

  res.status(201).json(createdCastMember);
});

//@desc Fetch cast member
//@route GET /api/castmembers/:id
//@access Public
const getCastMember = asyncHandler(async (req, res) => {
  const castMember = await CastMember.findById(req.params.id);

  if (castMember) {
    res.json(castMember);
  } else {
    res.status(404);
    throw new Error("Cast Member not Found");
  }
});

//@desc Link cast member to Showbook account
//@route PUT /api/castmembers/:id/linkaccount
//@access Private/Admin
const linkCastMemberAccount = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const castMember = await CastMember.findById(req.params.id);

  if (castMember) {
    castMember.isUser = true;
    castMember.userId = userId;

    await castMember.save();
    res.status(201).json({ message: "Cast Member Linked to Account" });
  } else {
    res.status(404);
    throw new Error("Cast Member not found");
  }
});

//@desc Get Cast Member name
//@route GET /api/castmembers/:id/name
//@access Public
const getCastMemberName = asyncHandler(async (req, res) => {
  const castMember = await CastMember.findById(req.params.id);

  if (castMember) {
    res.json(castMember.name);
  } else {
    res.status(404);
    throw new Error("Cast Member not Found");
  }
});

//@desc Fetch Top Cast Members
//@route GET /api/castmembers/
//@access Public
const getCastMemberList = asyncHandler(async (req, res) => {
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

  const count = await CastMember.countDocuments({ ...keyword });
  const castMembers = await CastMember.find({ ...keyword })
    .sort(ranked === "true" ? { rating: -1 } : { createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ castMembers, page, pages: Math.ceil(count / pageSize), count });
});

export {
  createCastMember,
  getCastMember,
  linkCastMemberAccount,
  getCastMemberName,
  getCastMemberList,
};
