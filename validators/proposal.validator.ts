import { body } from "express-validator";
export const validateProposal = [
  body("clientId").notEmpty().withMessage("Client id is required"),
  body("leadId").notEmpty().withMessage("Lead id is required"),
  body("cost").notEmpty().withMessage("Cost cannot be empty"),
  body("status").isString().notEmpty().withMessage("status cannot be empty"),
];

export const validateUpdateProposal = [
  body("id").notEmpty().withMessage("id is required"),
];
