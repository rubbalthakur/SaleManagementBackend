import { Router } from "express";
import {
  getAllLeadSourceByOrganisation,
  addLeadSource,
  updateLeadSource,
} from "../controller/leadSource.controller";
import {
  validateAddLeadSource,
  validateUpdateLeadSource,
} from "../validators/leadSource.validator ";
import { handleValidationErrors } from "../middlewares/validation.middleware";

const router = Router();

router.post("/getAllLeadSource", getAllLeadSourceByOrganisation);

router.post(
  "/addLeadSource",
  validateAddLeadSource,
  handleValidationErrors,
  addLeadSource
);

router.post(
  "/updateLeadSource",
  validateUpdateLeadSource,
  handleValidationErrors,
  updateLeadSource
);
export default router;
