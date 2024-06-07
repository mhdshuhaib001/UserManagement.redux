// userRoutes.js
import express from "express";
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
  .put(protect, UpdateUserProfile);

export default router;
