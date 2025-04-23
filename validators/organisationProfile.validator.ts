import { body } from "express-validator";

export const validateOrganisationProfile = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Organisation name is required"),
  body("country").isString().notEmpty().withMessage("Country is required"),
  body("state").isString().notEmpty().withMessage("State is required"),
  body("city").isString().notEmpty().withMessage("City is required"),
];
