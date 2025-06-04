import express from "express";
import {
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

router
  .route("/user-profile")
  .get(authHandler, updateUserProfile)
  .put(authHandler, updateUserProfile);

export default router;
