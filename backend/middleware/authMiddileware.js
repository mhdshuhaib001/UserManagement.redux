import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (res, req, next) => {
  let token;

  token = req.cookie.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.useId).select("-password");
    } catch (error) {
      res.status();
    }
  } else {
    res.status(401);
    throw new Error("Not Autherized");
  }
});

export { protect };
