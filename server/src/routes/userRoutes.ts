import express from "express";
import {
  deleteUserProfile,
  getUserProfile,
  loginController,
  logoutController,
  registerController,
  updateUserProfile,
} from "../controllers/userController";
import { authHandler } from "../middlewares/authHandler";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.get("/user-profile", authHandler, getUserProfile);

router
  .route("/user-profile/:id")
  .put(authHandler, updateUserProfile)
  .delete(deleteUserProfile);

export default router;
