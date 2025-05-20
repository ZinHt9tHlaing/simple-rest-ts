import express from "express";
import {
  deleteUserProfile,
  getUserProfile,
  loginController,
  logoutController,
  registerController,
  updateUserProfile,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.get("/user-profile", getUserProfile);

router
  .route("/user-profile/:id")
  .put(updateUserProfile)
  .delete(deleteUserProfile);

export default router;
