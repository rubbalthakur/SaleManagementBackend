import { body } from "express-validator";

export const validateLead = [
  body("employeeId").notEmpty().withMessage("Employee Id cannot be empty"),
  body("leadTypeId").notEmpty().withMessage("Lead Type Id cannot be empty"),
  body("leadSourceId").notEmpty().withMessage("Lead Source Id cannot be empty"),
  body("status")
    .isString()
    .notEmpty()
    .withMessage("Lead Status cannot be empty"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description cannot be empty"),
];
