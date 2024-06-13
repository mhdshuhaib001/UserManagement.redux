import express from "express";
import {
  adminLogin,
  getUsers,
  addUser,
  deleteUser,
  editUser,
  logout
} from "../controllers/adminControllers.js";

const router = express.Router();

router.post("/auth", adminLogin);
router.get("/getuser", getUsers);
router.post("/adduser", addUser);
router.delete("/delete", deleteUser);
router.post("/edituser", editUser);
router.post("/logout",logout);

// router.get('/adminauth', protect, adminauth);

export default router;
