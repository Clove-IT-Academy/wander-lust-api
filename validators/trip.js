import { body } from "express-validator";
import { ValidationError } from "../errors/validation";
import { validate } from "./validate";


export const createTripValidator = [
    body("title")
        .notEmpty()
        .withMessage("Title can not be empty")
        .isLength({min: 4})
        .withMessage("Title must be at least 4 characters long")
        .trim()
        .escape(),
    body("startDate")
        .notEmpty()
        .withMessage("Start date is required")
        .isDate()
        .withMessage("Start date must be a date")
        .trim()
        .escape(),
    body("endDate")
        .notEmpty()
        .withMessage("Start date is required")
        .isDate()
        .withMessage("Start date must be a date")
        .trim()
        .escape()
        .custom((value, {req})=>{
            if(value < req.body.startDate){
                throw new ValidationError("End date must be after start date")
            }
            return true;
        } ),
    body("destinations")
        .notEmpty()
        .withMessage("Destinations can not be empty")
        .isArray()
        .withMessage("Destinations must be an array")
        .trim()
        .escape()
        .custom((value)=>{
            return value.every((d)=>{ return typeof d == "string"})
        })
        .withMessage("Every item in destinations must be a string."),
    body("budget.total")
        .notEmpty()
        .withMessage("Total budget must not be empty")
        .isNumeric()
        .withMessage("Total budget must be a number")
        .trim()
        .escape(),
    body("budget.spent")
        .optional()
        .isNumeric()
        .withMessage("Spent Budget must be a number")
        .trim()
        .escape(),
    body("budget.expenses.*.name")
        .optional()
        .trim()
        .escape(),
    body("budget.expenses.*.amount")
        .optional()
        .isNumeric()
        .withMessage("Expense amount must be a number")
        .trim()
        .escape(),
    validate
    
];

export const updateTripValidator = [
    body("title")
        .optional()
        .isLength({min: 4})
        .withMessage("Title must be at least 4 characters long")
        .trim()
        .escape(),
    body("startDate")
        .optional()
        .isDate()
        .withMessage("Start date must be a date")
        .trim()
        .escape(),
    body("endDate")
        .optional()
        .isDate()
        .withMessage("Start date must be a date")
        .trim()
        .escape()
        .custom((value, {req})=>{
            if(value < req.body.startDate){
                throw new ValidationError("End date must be after start date")
            }
            return true;
        } ),
    body("destinations")
        .optional()
        .isArray()
        .withMessage("Destinations must be an array")
        .trim()
        .escape()
        .custom((value)=>{
            return value.every((d)=>{ return typeof d == "string"})
        })
        .withMessage("Every item in destinations must be a string."),
    body("budget.total")
        .optional()
        .isNumeric()
        .withMessage("Total budget must be a number")
        .trim()
        .escape(),
    body("budget.spent")
        .optional()
        .isNumeric()
        .withMessage("Spent Budget must be a number")
        .trim()
        .escape(),
    body("budget.expenses.*.name")
        .optional()
        .trim()
        .escape(),
    body("budget.expenses.*.amount")
        .optional()
        .isNumeric()
        .withMessage("Expense amount must be a number")
        .trim()
        .escape(),
    validate
];