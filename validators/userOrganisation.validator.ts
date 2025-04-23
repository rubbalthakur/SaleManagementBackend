import { body } from "express-validator";

export const validateUserOrganisation = [
  body("referralId").notEmpty().withMessage("referral Id cant be empty"),
  body("roleId").notEmpty().withMessage("roleId cant be empty"),
  body("emailId").isEmail().withMessage("a valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password should be atleast 8 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Password and Confirm Password must be same");
      }
      return true;
    }),
  body("confirmPassword")
    .isLength({ min: 6 })
    .withMessage("Confirm Password should be equal to password"),
];

export const validateUpdateUserOrganisation = [
  body("userId").notEmpty().withMessage("userId cannot be empty"),
  body("roleId").notEmpty().withMessage("roleId cannot be empty"),
];
