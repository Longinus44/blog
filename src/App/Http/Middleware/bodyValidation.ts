import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const bodyValidator = [
  body("email").isEmail().withMessage("please use a valid email"),
  body("password")
    .isLength({ min: 8})
    .withMessage(`password must be above 7 characters`),
  body("username").notEmpty().isLength({ min: 4 }).withMessage(`username should be above 3 characters`),
];


export const loginValidator = [
  body("username").notEmpty().withMessage("please use a valid credentails"),
  body("password").isLength({ min: 8 }).withMessage("please use a valid credentails"),
];

export const blogValidation = [
  body("title").notEmpty().withMessage("Title cannot be empty"),
  body("content").notEmpty().withMessage("content can not be empty"),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send({ error: "validation", errors: errors.array() });
    }
    next();
  } catch (error: any) {
    return error.message;
  }
};

