import { body } from "express-validator";
import { ValidationError } from "../errors/validation.js";
import { validate } from "./validate.js";
import User from "../models/user.js";

export const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must contain only letters")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .trim()
    .escape(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .trim()
    .escape()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new ValidationError("This email has already been taken.");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validate,
];

export const updateUserValidator = [
  body("name")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must contain only letters")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .trim()
    .escape(),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .trim()
    .escape()
    .custom(async (value, { req }) => {
      const user = await User.findOne({
        email: value,
        _id: { $ne: req.params.id },
      });
      if (user) {
        throw new ValidationError("This email has already been taken.");
      }
      return true;
    }),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validate,
];
