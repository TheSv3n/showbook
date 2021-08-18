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

//@desc Link cast member to Showbook account
//@route PUT /api/castmembers/:id/linkaccount
//@access Private/Admin
const linkCastMemberAccount = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const castMember = await CastMember.findById(req.params.id);

  if (castMember) {
    //TODO

    await castMember.save();
    res.status(201).json({ message: "Cast Member Linked to Account" });
  } else {
    res.status(404);
    throw new Error("Cast Member not found");
  }
});

export { createCastMember };
