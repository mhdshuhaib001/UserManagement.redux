import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../util/generateToken.js";
import bcrypt from "bcrypt";

// User Authentication

const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
console.log(password);
  const user = await User.findOne({ email });
console.log(user,'user');
const bcryptt= await bcrypt.compare(password, user.password)
console.log(bcryptt);
  if (user && bcryptt ) {
    const token = generateToken(res,user._id);
console.log(token);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token 
    });
    return
  } else {
    res.status(401).json({ message: "Invalid Email or Password" });
  }
});

// User Registration
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
    generateToken(res, user._id);
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

// User Logout
const LogOutUser = AsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// Get User Profile
const GetUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Update User Profile
const UpdateUserProfile = AsyncHandler(async (req, res) => {
  console.log(req.file,'reqbodyyyyy');
  console.log('before the req body');
  console.log(req.body._id,'reqbodyyyyy');

  const user = await User.findById(req.body._id);
  console.log('after the req body');

console.log(user,'hallooo');
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.file.filename || user.image
    

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export {
  authUser,
  RegisterUser,
  LogOutUser,
  GetUserProfile,
  UpdateUserProfile,
};
