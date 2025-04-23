import { body } from "express-validator";

export const validateAddLeadSource = [
  body("leadSourceName")
    .isString()
    .notEmpty()
    .withMessage("Lead Source name Id cant be empty"),
];

export const validateUpdateLeadSource = [
  body("id").notEmpty().withMessage("Lead Source Id cannot be empty"),
  body("leadSourceName")
    .isString()
    .notEmpty()
    .withMessage("Lead Source name cant be empty"),
];
