import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/logout", logoutController);

export default router;
