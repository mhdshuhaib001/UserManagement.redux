// userRoutes.js
import express from "express";
import userImage from '../config/multer.js'
import {
  authUser,
  RegisterUser,
  LogOutUser,
  GetUserProfile,
  UpdateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddileware.js";
const router = express.Router();

router.post("/auth", authUser);
router.post("/register", RegisterUser);
router.post("/logout", LogOutUser);
router
  .route("/profile")
  .get(protect, GetUserProfile)
  .put(protect,userImage.single("file"), UpdateUserProfile);

export default router;
