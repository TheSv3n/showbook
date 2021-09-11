import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, firstName, lastName, email, password, image } = req.body;

  const userExists =
    (await User.findOne({
      email: {
        $regex: email,
        $options: "i",
      },
    })) ||
    (await User.findOne({
      userName: {
        $regex: userName,
        $options: "i",
      },
    }));

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

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  let user;

  if (
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      userName.toLowerCase()
    )
  ) {
    user = await User.findOne({
      email: {
        $regex: userName,
        $options: "i",
      },
    });
  } else {
    user = await User.findOne({
      userName: {
        $regex: userName,
        $options: "i",
      },
    });
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Get Username
//@route GET /api/users/:id/name
//@access Public
const getUserName = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user.userName);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export { registerUser, authUser, getUserName };
