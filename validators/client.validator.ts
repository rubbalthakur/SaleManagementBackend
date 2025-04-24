import { body } from "express-validator";
export const validateClient = [
  body("emailId").isEmail().notEmpty().withMessage("Client email is required"),
  body("firstName")
    .isString()
    .notEmpty()
    .withMessage("First Name cannot be empty"),
  body("lastName")
    .isString()
    .notEmpty()
    .withMessage("Last Name cannot be empty"),
  body("city").isString().notEmpty().withMessage("City cannot be empty"),
  body("state").isString().notEmpty().withMessage("State cannot be empty"),
  body("country").isString().notEmpty().withMessage("Country cannot be empty"),
  body("contact").isString().notEmpty().withMessage("contact cannot be empty"),
];
