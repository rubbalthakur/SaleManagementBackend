import { Router } from "express";
import {
  getAllLeadTypeByOrganisation,
  addLeadType,
  updateLeadType,
} from "../controller/leadType.controller";
import {
  validateAddLeadType,
  validateUpdateLeadType,
} from "../validators/leadType.validator";
import { handleValidationErrors } from "../middlewares/validation.middleware";

const router = Router();

router.post("/getAllLeadType", getAllLeadTypeByOrganisation);

router.post(
  "/addLeadType",
  validateAddLeadType,
  handleValidationErrors,
  addLeadType
);

router.post(
  "/updateLeadType",
  validateUpdateLeadType,
  handleValidationErrors,
  updateLeadType
);
export default router;
