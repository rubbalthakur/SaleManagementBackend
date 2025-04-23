import { body } from "express-validator";

export const validateAddLeadType = [
  body("leadTypeName")
    .isString()
    .notEmpty()
    .withMessage("Lead Type name Id cant be empty"),
];

export const validateUpdateLeadType = [
  body("id").notEmpty().withMessage("Lead Id cannot be empty"),
  body("leadTypeName")
    .isString()
    .notEmpty()
    .withMessage("Lead Type name Id cant be empty"),
];
