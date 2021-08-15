import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, firstName, lastName, email, password, image } = req.body;

  const userExists =
    (await User.findOne({ email: email })) ||
    (await User.findOne({ userNameLower: userName.toLowerCase() }));

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const name = `${firstName} ${lastName}`;

  const user = await User.create({
    userName,
    name,
    email: email.toLowerCase(),
    password,
    userNameLower: userName.toLowerCase(),
    followedBy: [],
    image,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      image: image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { registerUser };
