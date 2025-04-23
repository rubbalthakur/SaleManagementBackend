import { body } from "express-validator";

export const validateRegisterUser = [
  body("emailId").isEmail().withMessage("A valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Password and confirm password must be same");
      }
      return true;
    }),
];

export const validateLoginUser = [
  body("emailId").isEmail().withMessage("A valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateUpdatePassword = [
  body("oldPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateUserProfile = [
  body("firstName").isString().notEmpty().withMessage("First name is required"),
  body("lastName").isString().notEmpty().withMessage("Last name is required"),
  body("country").isString().notEmpty().withMessage("Country is required"),
  body("state").isString().notEmpty().withMessage("State is required"),
  body("city").isString().notEmpty().withMessage("City is required"),
  body("contactNumber")
    .isLength({ min: 10 })
    .withMessage("Contact number must be at least 10 characters long"),
];
