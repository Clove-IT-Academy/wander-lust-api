import { body } from "express-validator";
import { validate } from "./validate";

export const createBaggageValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name can not be empty")
        .isLength({min: 2})
        .withMessage("Name must be at least 2 characters")
        .trim()
        .escape(),
    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Must be boolean")
        .trim()
        .escape(),
    validate
]

export const updateBaggageValidator = [
    body("name")
        .optional()
        .isLength({min: 2})
        .withMessage("Name must be at least 2 characters")
        .trim()
        .escape(),
    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Must be boolean")
        .trim()
        .escape(),
    validate
]