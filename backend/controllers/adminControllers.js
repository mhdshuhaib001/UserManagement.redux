import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";

import AsyncHandler from "express-async-handler";
dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const adminCredentials = {
  email: adminEmail,
  password: adminPassword,
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (
    email === adminCredentials.email &&
    password === adminCredentials.password
  ) {
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ message: "Login successful", token: token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

const getUsers = AsyncHandler(async (req, res) => {
  const { searchTerm } = req.query;
  let users;

  if (searchTerm) {
    users = await User.find({
      $or: [
        { name: { $regex: new RegExp(searchTerm, "i") } },
        { email: { $regex: new RegExp(searchTerm, "i") } },
      ],
    });
  } else {
    users = await User.find({});
  }

  res.json(users);
});


const addUser = AsyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = new User({ name, email, password });
    console.log(user);
    const createdUser = await user.save();

    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteUser = AsyncHandler(async (req, res) => {
  try {
    console.log("hallooo");
    const userId = req.query.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const editUser = AsyncHandler(async (req, res) => {
  console.log('Received request to edit user');

  try {
    const { userId, name, email } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
console.log('hallooo');
    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error updating user');
  }
});

// adminControllers.js

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ message: "Error logging out" });
      return;
    }

    res.clearCookie("sessionID");

    res.status(200).json({ message: "Logout successful" });
  });
};


export { adminLogin, getUsers, addUser, deleteUser, editUser,logout };
