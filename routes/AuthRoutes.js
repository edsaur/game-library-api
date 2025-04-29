import express from "express";
import { createUser, loginUser } from "../controllers/UserController.js";
import { body } from "express-validator";

const authRouter = express.Router();

authRouter.post(
  "/register",
  [
    body("username").not().isEmpty(),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .notEmpty()
      .withMessage("Please enter a password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  createUser
);

authRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Please enter a password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);

export default authRouter;
