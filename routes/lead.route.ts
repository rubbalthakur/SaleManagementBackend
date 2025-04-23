import { Router } from "express";

import {
  createLead,
  updateLead,
  getAllLeadsByOrganisaion,
  getLeadByUserId,
} from "../controller/lead.controller";
import { validateLead } from "../validators/lead.validator";
import { handleValidationErrors } from "../middlewares/validation.middleware";

const router = Router();

router.post("/getAllLeadsByOrganisation", getAllLeadsByOrganisaion);
router.post("/getLeadByUserId", getLeadByUserId);
router.post("/addLead", validateLead, handleValidationErrors, createLead);
router.post("/updateLead", validateLead, handleValidationErrors, updateLead);

export default router;
