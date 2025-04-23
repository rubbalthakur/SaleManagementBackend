import { Router } from "express";
import { handleValidationErrors } from "../middlewares/validation.middleware";
import { validateOrganisationProfile } from "../validators/organisationProfile.validator";

import {
  getOrganisationProfile,
  createOrUpdateOrganisationProfile,
} from "../controller/organisationProfile.controller";

const router = Router();
router.post("/getOrganisationProfile", getOrganisationProfile);

router.post(
  "/updateOrganisationProfile",
  validateOrganisationProfile,
  handleValidationErrors,
  createOrUpdateOrganisationProfile
);

export default router;
