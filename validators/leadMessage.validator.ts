import { body } from "express-validator";

export const validateLeadMessage = [
  body("leadId").notEmpty().withMessage("lead Id cannot be empty"),
  body("message").isString().notEmpty().withMessage("Message cannot be empty"),
];
