import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateTocken from "../util/generateToken.js";
import bcrypt from "bcryptjs";

const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateTocken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401).json({ message: "Invalid Email or Password" });
  }
});

const RegisterUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    generateTocken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const LogOutUser = AsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

const GetUserProfile = AsyncHandler(async (req, res) => {
  res.status(200).json({ message: "User profile" });
});

const UpdateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email, 
    });
  } else {
    res.status(404);
    throw new Error("User Is Not Found ");
  }
  res.status(200).json({ message: "User profile updated" });
});

export {
  authUser,
  RegisterUser,
  LogOutUser,
  GetUserProfile,
  UpdateUserProfile,
};
